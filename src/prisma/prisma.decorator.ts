import { createParamDecorator, ExecutionContext, HttpException, HttpStatus } from "@nestjs/common";
import { Request } from "express";

interface FilterMap {
  [key: string]: string | Date | FilterMap;
}

interface PrismaQueryNormalized {
  where: FilterMap;
  skip: number;
  take: number;
  orderBy: FilterMap[];
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
      const where = {};

      if (filterKeys.length !== 0) {
        for (const key of filterKeys) {
          let filterValue = filterObj[key];
          if (typeof filterValue === "string") {
            const date = new Date(filterValue);
            if (!Number.isNaN(date.getTime())) filterValue = date;
          }

          const keyStrings = key.split("_");
          const sign = keyStrings[keyStrings.length - 1];

          if (sign === "gte" || sign === "gt" || sign === "lt" || sign === "lte") {
            const slicedKey = keyStrings.slice(0, -1).join("_");
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
            where[key] = filterValue;
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

  console.log({ prismaQuery });
  return prismaQuery;
});
