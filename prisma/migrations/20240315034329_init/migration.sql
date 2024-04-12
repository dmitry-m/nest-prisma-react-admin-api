-- CreateEnum
CREATE TYPE "ReviewStatus" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED');

-- CreateEnum
CREATE TYPE "CommandsStatus" AS ENUM ('ORDERED', 'DELIVERED', 'REVOKED');

-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT,
    "avatar" TEXT,
    "role" TEXT DEFAULT 'user',
    "is_admin" BOOLEAN DEFAULT false,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Customers" (
    "id" SERIAL NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL DEFAULT '',
    "address" TEXT DEFAULT '',
    "zipcode" TEXT DEFAULT '',
    "city" TEXT DEFAULT '',
    "avatar" TEXT DEFAULT '',
    "birthday" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "first_seen" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "last_seen" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "has_ordered" BOOLEAN DEFAULT false,
    "stateAbbr" TEXT DEFAULT '',
    "latest_purchase" TIMESTAMP(3),
    "has_newsletter" BOOLEAN DEFAULT true,
    "groups" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "nb_commands" INTEGER DEFAULT 0,
    "total_spent" INTEGER DEFAULT 0,

    CONSTRAINT "Customers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Categories" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Products" (
    "id" SERIAL NOT NULL,
    "category_id" INTEGER NOT NULL,
    "reference" TEXT NOT NULL,
    "width" INTEGER NOT NULL,
    "height" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "thumbnail" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "description" TEXT DEFAULT '',
    "stock" INTEGER NOT NULL,
    "sales" INTEGER DEFAULT 0,

    CONSTRAINT "Products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Commands" (
    "id" SERIAL NOT NULL,
    "reference" TEXT NOT NULL,
    "date" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "customer_id" INTEGER NOT NULL,
    "basket" JSONB NOT NULL,
    "total_ex_taxes" INTEGER NOT NULL,
    "delivery_fees" INTEGER NOT NULL,
    "tax_rate" INTEGER NOT NULL,
    "taxes" INTEGER NOT NULL,
    "total" INTEGER NOT NULL,
    "status" "CommandsStatus" NOT NULL DEFAULT 'ORDERED',
    "returned" BOOLEAN NOT NULL DEFAULT false,

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
    "comment" TEXT NOT NULL,

    CONSTRAINT "Reviews_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Customers_email_key" ON "Customers"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Invoices_command_id_key" ON "Invoices"("command_id");

-- CreateIndex
CREATE UNIQUE INDEX "Invoices_customer_id_key" ON "Invoices"("customer_id");

-- CreateIndex
CREATE UNIQUE INDEX "Reviews_command_id_key" ON "Reviews"("command_id");

-- CreateIndex
CREATE UNIQUE INDEX "Reviews_product_id_key" ON "Reviews"("product_id");

-- CreateIndex
CREATE UNIQUE INDEX "Reviews_customer_id_key" ON "Reviews"("customer_id");

-- AddForeignKey
ALTER TABLE "Products" ADD CONSTRAINT "Products_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Commands" ADD CONSTRAINT "Commands_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "Customers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoices" ADD CONSTRAINT "Invoices_command_id_fkey" FOREIGN KEY ("command_id") REFERENCES "Commands"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoices" ADD CONSTRAINT "Invoices_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "Customers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reviews" ADD CONSTRAINT "Reviews_command_id_fkey" FOREIGN KEY ("command_id") REFERENCES "Commands"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reviews" ADD CONSTRAINT "Reviews_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reviews" ADD CONSTRAINT "Reviews_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "Customers"("id") ON DELETE CASCADE ON UPDATE CASCADE;
