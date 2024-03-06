import { createParamDecorator, ExecutionContext, HttpException, HttpStatus } from "@nestjs/common";
import { Request } from "express";

type FilterValue = number | string | Date | FilterMap;

interface FilterMap {
  [key: string]: FilterValue;
}

interface PrismaQueryNormalized {
  where: FilterMap;
  skip: number;
  take: number;
  orderBy: FilterMap[];
}

function returnNumIfValid(value: FilterValue): FilterValue {
  return typeof value === "string" && !Number.isNaN(Number.parseFloat(value))
    ? Number.parseFloat(value)
    : value;
}

export const PrismaQuery = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request: Request = ctx.switchToHttp().getRequest();
  const { range, sort, filter } = request.query;
  let skip = 0;
  let take = 100;
  let prismaQuery: PrismaQueryNormalized = {
    where: {},
    skip: 0,
    take: 100,
    orderBy: [],
  };

  if (typeof sort === "string") {
    try {
      const [sortParam, sortOrder] = JSON.parse(sort) as string[];
      prismaQuery = {
        ...prismaQuery,
        orderBy: [{ [sortParam]: sortOrder.toLowerCase() }],
      };
    } catch (error) {
      throw new HttpException("Bad request, error in url-query sort field", HttpStatus.BAD_REQUEST);
    }
  }

  if (typeof filter === "string") {
    try {
      const filterObj = JSON.parse(filter) as FilterMap;
      const filterKeys = Object.keys(filterObj);
      const where: FilterMap = {};

      // if (filterKeys.length !== 0) {
      //   for (const key of filterKeys) {
      //     let filterValue = filterObj[key];
      //     if (typeof filterValue === "string") {
      //       const date = new Date(filterValue);
      //       if (!Number.isNaN(date.getTime())) filterValue = date;
      //     }

      //     const keyStrings = key.split("_");
      //     const sign = keyStrings[keyStrings.length - 1];

      //     if (sign === "gte" || sign === "gt" || sign === "lt" || sign === "lte") {
      //       const slicedKey = keyStrings.slice(0, -1).join("_");
      //       where[slicedKey] = { [sign]: filterValue };
      //     } else if (Array.isArray(filterValue)) {
      //       where[key] = { in: filterValue };
      //     } else if (key === "status") {
      //       where[key] = (filterValue as string).toUpperCase();
      //     } else if (key === "groups") {
      //       where[key] = { has: filterValue };
      //     } else if (key === "q") {
      //       where[key] = { contains: filterValue, mode: "insensitive" };
      //     } else {
      //       where[key] = filterValue;
      //     }
      //   }
      // }

      if (filterKeys.length !== 0) {
        for (const key of filterKeys) {
          let filterValue: FilterValue = filterObj[key];

          const keyStrings = key.split("_");
          const sign = keyStrings[keyStrings.length - 1];

          if (sign === "gte" || sign === "gt" || sign === "lt" || sign === "lte") {
            const slicedKey = keyStrings.slice(0, -1).join("_");
            console.log({ slicedKey });
            console.log({ filterValue });
            if (typeof filterValue === "string") {
              if (slicedKey === "date" || slicedKey === "last_seen" || slicedKey === "first_seen") {
                filterValue = new Date(filterValue);
              } else {
                filterValue = returnNumIfValid(filterValue);
              }
            }
            where[slicedKey] = { [sign]: filterValue };
          } else if (Array.isArray(filterValue)) {
            where[key] = { in: filterValue };
          } else if (key === "status") {
            where[key] = (filterValue as string).toUpperCase();
          } else if (key === "groups") {
            where[key] = { has: filterValue };
          } else if (key === "q") {
            where[key] = { contains: filterValue, mode: "insensitive" };
          } else {
            where[key] = returnNumIfValid(filterValue);
          }
        }
      }

      prismaQuery = { ...prismaQuery, where };
    } catch (error) {
      throw new HttpException(
        "Bad request, error in url-query filter field",
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  if (typeof range === "string") {
    try {
      const [min, max] = JSON.parse(range) as number[];
      take = max - min + 1;
      skip = min;
      prismaQuery = { ...prismaQuery, skip, take };
    } catch (error) {
      throw new HttpException(
        "Bad request, error in url-query range field",
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  console.log(JSON.stringify(prismaQuery, null, 2));
  return prismaQuery;
});
