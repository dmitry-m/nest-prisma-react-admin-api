import { Prisma, PrismaClient } from "@prisma/client";
import { compare, genSalt, hash } from "bcryptjs";

import generateData from "data-generator-retail";

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

  const DB_users = await prisma.users.createMany({
    data: userData,
    skipDuplicates: true,
  });
};

async function main() {
  await insertUsers();

  const data = generateData({ serializeDate: true });
  console.log({ data });
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

  const products = data.products.map((c: { id: any }) => {
    delete c.id;
    return c;
  });

  const commands = data.commands.map((c: { id: any; status: string }) => {
    delete c.id;
    c.status = c.status
      ? c.status === "cancelled"
        ? "REVOKED"
        : c.status.toUpperCase()
      : "ORDERED";
    // delete c.status;
    return c;
  });

  const invoices = data.invoices.map((c: { id: any }) => {
    delete c.id;
    return c;
  });

  const reviews = data.reviews.map((c: { id: any; status: string }) => {
    delete c.id;
    c.status = c.status ? c.status.toUpperCase() : "PENDING";
    return c;
  });

  console.log({ customers, categories, products, commands, invoices, reviews });

  const DB_customers = await prisma.customers.createMany({
    data: customers,
    skipDuplicates: true,
  });

  const DB_categories = await prisma.categories.createMany({
    data: categories,
    skipDuplicates: true,
  });

  const DB_products = await prisma.products.createMany({
    data: products,
    skipDuplicates: true,
  });

  const DB_commands = await prisma.commands.createMany({
    data: commands,
    skipDuplicates: true,
  });

  const DB_invoices = await prisma.invoices.createMany({
    data: invoices,
    skipDuplicates: true,
  });

  const DB_reviews = await prisma.reviews.createMany({
    data: reviews,
    skipDuplicates: true,
  });

  console.log({
    DB_customers: DB_customers.count,
    DB_categories: DB_categories.count,
    DB_commands: DB_commands.count,
    DB_products: DB_products.count,
    DB_invoices: DB_invoices.count,
    DB_reviews: DB_reviews.count,
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
