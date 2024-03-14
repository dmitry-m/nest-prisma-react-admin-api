/* eslint-disable no-empty */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Prisma, PrismaClient } from "@prisma/client";
import { compare, genSalt, hash } from "bcryptjs";

import generateData from "data-generator-retail";

console.log("Seeding database... wait for it...");

const prisma = new PrismaClient();

const insertUsers = async () => {
  const passwordNilu = await hash("123456", await genSalt(10));
  const passwordAlice = await hash("123456", await genSalt(10));
  const userData: Prisma.UsersCreateInput[] = [
    {
      fullName: "Alice Dow",
      email: "alice@prisma.io",
      avatar: "https://marmelab.com/posters/avatar-80.jpeg",
      password: passwordAlice,
      role: "admin",
      isAdmin: true,
    },
    {
      fullName: "Nilu Pilu",
      email: "nilu@prisma.io",
      avatar: "https://marmelab.com/posters/avatar-80.jpeg",
      password: passwordNilu,
      role: "user",
      isAdmin: false,
    },
  ];

  const DB_USERS = await prisma.users.createMany({
    data: userData,
    skipDuplicates: true,
  });
};

function increaseIdProps(obj: Record<string, any>): Record<string, any> {
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      if (key.endsWith("_id")) {
        obj[key] += 1;
      } else if (Array.isArray(obj[key])) {
        obj[key].forEach((item) => increaseIdProps(item as Record<string, any>));
      } else if (typeof obj[key] === "object" && obj[key] !== null) {
        increaseIdProps(obj[key] as Record<string, any>);
      } else if (typeof obj[key] === "string") {
        try {
          increaseIdProps(JSON.parse(obj[key] as string) as Record<string, any>);
        } catch (error) {}
      }
    }
  }
  return obj;
}

async function main() {
  await insertUsers();

  const data = generateData({ serializeDate: true });

  const customers = data.customers.map(
    (c: { id: any; stateAbbr: any; birthday: any; latest_purchase: any }) => {
      delete c.id;
      c.stateAbbr = c.stateAbbr ? c.stateAbbr : "";
      if (!c.birthday) delete c.birthday;
      if (!c.latest_purchase) delete c.latest_purchase;
      return c;
    },
  );

  const categories = data.categories.map((c: { id: any }) => {
    delete c.id;
    return c;
  });

  const products = data.products.map((c: { [x: string]: any; id: any }) => {
    delete c.id;
    return { ...c, category_id: +c.category_id + 1 };
  });

  const commands = data.commands.map((c: { id: any; status: string }) => {
    delete c.id;
    c.status = c.status
      ? c.status === "cancelled"
        ? "REVOKED"
        : c.status.toUpperCase()
      : "ORDERED";
    // delete c.status;
    return increaseIdProps(c);
  });

  const invoices = data.invoices.map((c: { id: any }) => {
    delete c.id;
    return increaseIdProps(c);
  });

  const reviews = data.reviews.map((c: { customer_id: any; id: any; status: string }) => {
    delete c.id;
    c.status = c.status ? c.status.toUpperCase() : "PENDING";
    return increaseIdProps(c);
  });

  const DB_CUSTOMERS = await prisma.customers.createMany({
    data: customers,
    skipDuplicates: true,
  });

  const DB_CATEGORIES = await prisma.categories.createMany({
    data: categories,
    skipDuplicates: true,
  });

  const DB_PRODUCTS = await prisma.products.createMany({
    data: products,
    skipDuplicates: true,
  });

  const DB_COMMANDS = await prisma.commands.createMany({
    data: commands,
    skipDuplicates: true,
  });

  const DB_INVOICES = await prisma.invoices.createMany({
    data: invoices,
    skipDuplicates: true,
  });

  const DB_REVIEWS = await prisma.reviews.createMany({
    data: reviews,
    skipDuplicates: true,
  });

  console.log({
    DB_customers: DB_CUSTOMERS.count,
    DB_categories: DB_CATEGORIES.count,
    DB_commands: DB_COMMANDS.count,
    DB_products: DB_PRODUCTS.count,
    DB_invoices: DB_INVOICES.count,
    DB_reviews: DB_REVIEWS.count,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
