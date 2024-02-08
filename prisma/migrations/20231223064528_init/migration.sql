-- CreateEnum
CREATE TYPE "ReviewStatus" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED');

-- CreateEnum
CREATE TYPE "CommandsStatus" AS ENUM ('ORDERED', 'DELIVERED', 'REVOKED');

-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "fullName" TEXT,
    "avatar" TEXT,
    "role" TEXT DEFAULT 'user',
    "isAdmin" BOOLEAN DEFAULT false,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Customers" (
    "id" SERIAL NOT NULL,
    "first_name" TEXT,
    "last_name" TEXT,
    "email" TEXT,
    "address" TEXT,
    "zipcode" TEXT,
    "city" TEXT,
    "avatar" TEXT,
    "birthday" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "first_seen" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_seen" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "has_ordered" BOOLEAN NOT NULL,
    "stateAbbr" TEXT,
    "latest_purchase" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "has_newsletter" BOOLEAN NOT NULL,
    "groups" TEXT[],
    "nb_commands" INTEGER NOT NULL,
    "total_spent" INTEGER NOT NULL,

    CONSTRAINT "Customers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Categories" (
    "id" SERIAL NOT NULL,
    "name" TEXT,

    CONSTRAINT "Categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Products" (
    "id" SERIAL NOT NULL,
    "category_id" INTEGER NOT NULL,
    "reference" TEXT,
    "width" INTEGER NOT NULL,
    "height" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "thumbnail" TEXT,
    "image" TEXT,
    "description" TEXT,
    "stock" INTEGER NOT NULL,
    "sales" INTEGER NOT NULL,

    CONSTRAINT "Products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Commands" (
    "id" SERIAL NOT NULL,
    "reference" TEXT,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "customer_id" INTEGER NOT NULL,
    "basket" JSONB,
    "total_ex_taxes" INTEGER NOT NULL,
    "delivery_fees" INTEGER NOT NULL,
    "tax_rate" INTEGER NOT NULL,
    "taxes" INTEGER NOT NULL,
    "total" INTEGER NOT NULL,
    "status" "CommandsStatus" NOT NULL DEFAULT 'ORDERED',
    "returned" BOOLEAN NOT NULL,

    CONSTRAINT "Commands_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Invoices" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "command_id" INTEGER NOT NULL,
    "customer_id" INTEGER NOT NULL,
    "total_ex_taxes" INTEGER NOT NULL,
    "delivery_fees" INTEGER NOT NULL,
    "tax_rate" INTEGER NOT NULL,
    "taxes" INTEGER NOT NULL,
    "total" INTEGER NOT NULL,

    CONSTRAINT "Invoices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reviews" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "ReviewStatus" NOT NULL DEFAULT 'PENDING',
    "command_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,
    "customer_id" INTEGER NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT,

    CONSTRAINT "Reviews_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");
