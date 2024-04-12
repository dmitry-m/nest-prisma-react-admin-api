  <div align="center">
  <h1 align="center">react-admin</h1>
  <h3>Codebase for the react-admin platform</h3>
  <h3>◦ Developed with the software and tools below.</h3>
  <p align="center"><img src="https://img.shields.io/badge/-NestJS-004E89?logo=NestJS&style=flat" alt='NestJS\' />
<img src="https://via.placeholder.com/1/0000/00000000" alt="spacer" /><img src="https://img.shields.io/badge/-TypeScript-004E89?logo=TypeScript&style=flat" alt='TypeScript\' />
<img src="https://via.placeholder.com/1/0000/00000000" alt="spacer" /><img src="https://img.shields.io/badge/-Prisma-004E89?logo=Prisma&style=flat" alt='Prisma\' />
<img src="https://via.placeholder.com/1/0000/00000000" alt="spacer" /><img src="https://img.shields.io/badge/-PostgreSQL-004E89?logo=PostgreSQL&style=flat" alt='PostgreSQL\' />
<img src="https://via.placeholder.com/1/0000/00000000" alt="spacer" /><img src="https://img.shields.io/badge/-Jest-004E89?logo=Jest&style=flat" alt='Jest\' />
<img src="https://via.placeholder.com/1/0000/00000000" alt="spacer" /><img src="https://img.shields.io/badge/-ESLint-004E89?logo=ESLint&style=flat" alt='ESLint"' />
<img src="https://via.placeholder.com/1/0000/00000000" alt="spacer" />
  </p>
  </div>
  
  ---
  ## 📚 Table of Contents
  - [📚 Table of Contents](#-table-of-contents)
  - [🔍 Overview](#-overview)
  - [🌟 Features](#-features)
  - [📁 Repository Structure](#-repository-structure)
  - [💻 Code Summary](#-code-summary)
  - [🚀 Getting Started](#-getting-started)
  
  ---
  
  
  ## 🔍 Overview

This is a Nest.js project with a comprehensive tree structure, consisting of various directories and files. The project is using TypeScript as the programming language and Prisma for database management.The project's main entry point is the `main.ts` file, which sets up the Nest application and imports the necessary modules. The `src` directory contains all the source code for the application, including controllers, services, entities, and other components.The `prisma` directory contains the Prisma schema and seed data, which are used to manage the application's database. The `data-generator-retail.d.ts` file is a Prisma data generator that generates sample data for the application.The `docker-compose.yml` file is used to set up the application's Docker environment, while the `Dockerfile` is used to build the Docker image for the application. The `nest-cli.json` file is used by the Nest CLI to manage the application's configuration.The `README.md` file contains information about the project, including installation instructions and usage guidelines. The `package.json` file contains metadata about the project, including dependencies and scripts.Overall, this is a well-structured Nest.js project with a clear separation of concerns between the different components and a robust database management system using Prisma

---

## 🌟 Features

The project includes the following features:<br>

- Nest.js framework
- TypeScript programming language
- Prisma database management system
- Docker environment
- Jest testing framework
- E2E testing with Cypress
- GraphQL API
- RESTful API
- Authentication and authorization
- CRUD operations for various entities (users, categories, products, reviews, invoices)
- Decorators for dependency injection and authentication
- Services for business logic
- Controllers for handling HTTP requests
- Modules for organizing code into logical components
- Entity classes for managing data in the database
- DTOs (Data Transfer Objects) for defining the structure of request and response bodies
- Interfaces for defining the shape of objects
- Seed data for the database
- Prisma schema for defining the database schema
- Prisma data generator for generating sample data
- Global middleware for adding context to every request
- Exception filters for handling errors
- Telegram integration for sending notifications
- E2E tests for verifying the application's functionality
- Jest configuration for running E2E tests
- Docker configuration for building and running the application in a container
- Nest CLI configuration for managing the application's configuration

---

## 📁 Repository Structure

```sh
├── .env
├── .eslintrc.js
├── .gitignore
├── .prettierrc
├── data-generator-retail.d.ts
├── docker-compose.yml
├── Dockerfile
├── nest-cli.json
├── package.json
├── prisma
│   ├── schema.prisma
│   └── seed.ts
├── README.md
├── src
│   ├── app.module.ts
│   ├── auth
│   │   ├── auth.controller.ts
│   │   ├── auth.interface.ts
│   │   ├── auth.module.ts
│   │   ├── auth.service.ts
│   │   ├── decorators
│   │   │   └── auth.decorator.ts
│   │   ├── dto
│   │   │   └── auth.dto.ts
│   │   ├── guards
│   │   │   ├── admin.guard.ts
│   │   │   ├── jwt.guard.ts
│   │   │   └── local.guard.ts
│   │   └── strategies
│   │       ├── jwt.strategy.ts
│   │       └── local.strategy.ts
│   ├── categories
│   │   ├── categories.controller.ts
│   │   ├── categories.entity.ts
│   │   ├── categories.interface.ts
│   │   ├── categories.module.ts
│   │   ├── categories.service.ts
│   │   └── dto
│   │       ├── categories.ts
│   │       ├── create-category.dto.ts
│   │       └── update-category.dto.ts
│   ├── commands
│   │   ├── commands.controller.ts
│   │   ├── commands.entity.ts
│   │   ├── commands.interface.ts
│   │   ├── commands.module.ts
│   │   ├── commands.service.ts
│   │   └── dto
│   │       ├── create-command.dto.ts
│   │       └── update-command.dto.ts
│   ├── configs
│   │   ├── jwt.config.ts
│   │   └── telegram.config.ts
│   ├── customers
│   │   ├── customers.controller.ts
│   │   ├── customers.entity.ts
│   │   ├── customers.interface.ts
│   │   ├── customers.module.ts
│   │   ├── customers.service.ts
│   │   └── dto
│   │       ├── create-customer.dto.ts
│   │       └── update-customer.dto.ts
│   ├── entities
│   │   └── baseEntity.entity.ts
│   ├── filters
│   │   └── all-exception.filter.ts
│   ├── invoices
│   │   ├── dto
│   │   │   ├── create-invoice.dto.ts
│   │   │   └── update-invoice.dto.ts
│   │   ├── invoices.controller.spec.ts
│   │   ├── invoices.controller.ts
│   │   ├── invoices.entity.ts
│   │   ├── invoices.interface.ts
│   │   ├── invoices.module.ts
│   │   ├── invoices.service.spec.ts
│   │   └── invoices.service.ts
│   ├── main.ts
│   ├── middlewares
│   │   └── global-context.middleware.ts
│   ├── prisma
│   │   ├── classes
│   │   │   ├── categories.ts
│   │   │   ├── commands.ts
│   │   │   ├── customers.ts
│   │   │   ├── index.ts
│   │   │   ├── invoices.ts
│   │   │   ├── products.ts
│   │   │   ├── reviews.ts
│   │   │   └── users.ts
│   │   ├── prisma.decorator.ts
│   │   ├── prisma.module.ts
│   │   ├── prisma.service.spec.ts
│   │   └── prisma.service.ts
│   ├── products
│   │   ├── dto
│   │   │   ├── create-product.dto.ts
│   │   │   └── update-product.dto.ts
│   │   ├── products.controller.ts
│   │   ├── products.entity.ts
│   │   ├── products.interface.ts
│   │   ├── products.module.ts
│   │   └── products.service.ts
│   ├── reviews
│   │   ├── dto
│   │   │   ├── create-reviews.dto.ts
│   │   │   └── update-reviews.dto.ts
│   │   ├── reviews.controller.ts
│   │   ├── reviews.entity.ts
│   │   ├── reviews.interface.ts
│   │   ├── reviews.module.ts
│   │   └── reviews.service.ts
│   ├── telegram
│   │   ├── telegram.constants.ts
│   │   ├── telegram.interface.ts
│   │   ├── telegram.module.ts
│   │   └── telegram.service.ts
│   └── user
│       ├── decorators
│       │   └── user.decorator.ts
│       ├── dto
│       │   ├── create-user.dto.ts
│       │   ├── password.dto.ts
│       │   ├── update-user.dto.ts
│       │   └── update.dto.ts
│       ├── user.controller.ts
│       ├── user.entity.ts
│       ├── user.interface.ts
│       ├── user.module.ts
│       └── user.service.ts
├── test
│   ├── app.e2e-spec.ts
│   └── jest-e2e.json
├── tsconfig.build.json
├── tsconfig.json
├── yarn-error.log
└── yarn.lock

```

---

## 💻 Code Summary

<details><summary>Root</summary>

| File                       | Summary                                                                                                                              |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| .eslintrc.js               | The code defines an ESLint configuration file for TypeScript projects, with a focus on Airbnb's style guide and Prettier formatting. |
| data-generator-retail.d.ts | The code declares a module for generating retail data.                                                                               |

</details>

---

<details><summary>\prisma</summary>

| File    | Summary                                                                                                                                                                                                                                                     |
| ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| seed.ts | The code is a TypeScript script that seeds a Prisma database with data generated by the `generateData` function. It creates users, customers, categories, products, commands, invoices, and reviews, and logs the number of records created for each table. |

</details>

---

<details><summary>\src</summary>

| File          | Summary                                                                                                                                                                                           |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| app.module.ts | The code defines a NestJS module called `AppModule` that imports various other modules, providers, and configurations, and exports a `configure()` method that sets up middleware for all routes. |
| main.ts       | The code creates a NestJS application, sets up various middleware and configuration options, and starts the server on the specified port.                                                         |

</details>

---

<details><summary>\src\auth</summary>

| File               | Summary                                                                                                                                                                                                                                                                                 |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| auth.controller.ts | The code defines a NestJS controller for authentication, with methods for login, signup, logout, and retrieving new tokens.                                                                                                                                                             |
| auth.interface.ts  | The code defines an interface for authentication, with a user object and access token properties, excluding the password property from the User entity.                                                                                                                                 |
| auth.module.ts     | The AuthModule is a NestJS module that provides authentication and authorization functionality using JWT tokens, with dependencies on other modules such as ConfigModule, JwtModule, PassportModule, UserModule, and PrismaService.                                                     |
| auth.service.ts    | The code defines an AuthService class that provides authentication and authorization functionality for a NestJS application. It includes methods for issuing JWT tokens, validating user credentials, authenticating users, signing up new users, and refreshing authentication tokens. |

</details>

---

<details><summary>\src\auth\decorators</summary>

| File              | Summary                                                                                                                                                      |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| auth.decorator.ts | The Auth function is a decorator that applies the JwtAuthGuard and OnlyAdminGuard guards to a class or method, depending on the value of the role parameter. |

</details>

---

<details><summary>\src\auth\dto</summary>

| File        | Summary                                                                                                                                                                                                                                                                                                                                                                                            |
| ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| auth.dto.ts | The code defines a class called AuthDto that contains two properties: username and password, both of which are strings. The username property is validated using the IsString decorator and the MinLength decorator with a minimum length of 6 characters. The password property is also validated using the IsString decorator and the MinLength decorator with a minimum length of 6 characters. |

</details>

---

<details><summary>\src\auth\guards</summary>

| File           | Summary                                                                                                                                                                       |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| admin.guard.ts | The code defines a NestJS guard class OnlyAdminGuard that checks if the current user is an admin and throws a ForbiddenException if they are not, returning true if they are. |
| jwt.guard.ts   | The JwtAuthGuard class extends the AuthGuard class from NestJS Passport and is used to authenticate requests using JSON Web Tokens (JWT).                                     |
| local.guard.ts | The LocalAuthGuard class is a NestJS guard that extends the AuthGuard class and uses the local strategy for authentication.                                                   |

</details>

---

<details><summary>\src\auth\strategies</summary>

| File              | Summary                                                                                                                                                                                               |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| jwt.strategy.ts   | The JwtStrategy class is a Passport strategy that validates JSON Web Tokens (JWTs) by extracting the token from the Authorization header and verifying its signature using the configured secret key. |
| local.strategy.ts | The LocalStrategy class in NestJS is a Passport strategy that authenticates users using the passport-local package, validating their credentials by calling the AuthService's validateUser method.    |

</details>

---

<details><summary>\src\categories</summary>

| File                     | Summary                                                                                                                                                                    |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| categories.controller.ts | The code defines a NestJS controller for managing categories, with CRUD operations and authentication.                                                                     |
| categories.entity.ts     | The code defines a CategoryEntity class that extends CreateCategoryDto and adds an id property with the ApiProperty decorator.                                             |
| categories.interface.ts  | The code defines an interface for a Prisma query that allows searching categories by name.                                                                                 |
| categories.module.ts     | The CategoriesModule is a NestJS module that provides the CategoriesController and CategoriesService, as well as the PrismaService, for managing categories in a database. |
| categories.service.ts    | The code defines a NestJS service class for managing categories, with methods for creating, finding, updating, and deleting categories.                                    |

</details>

---

<details><summary>\src\categories\dto</summary>

| File                   | Summary                                                                                                                                                                                      |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| categories.ts          | The code defines a class called Categories, which has an id property of type number and a name property of type string, as well as a products property that is an array of Products objects. |
| create-category.dto.ts | The CreateCategoryDto class in NestJS is a data transfer object (DTO) used to create a new category with a name.                                                                             |
| update-category.dto.ts | The UpdateCategoryDto class extends the CreateCategoryDto class with a PartialType decorator, allowing for partial updates of category entities.                                             |

</details>

---

<details><summary>\src\commands</summary>

| File                   | Summary                                                                                                                                                                                                                                                     |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| commands.controller.ts | The code defines a NestJS controller for managing commands, with CRUD operations for creating, reading, updating, and deleting command entities. It also includes authentication and validation using the `@nestjs/common` and `@nestjs/swagger` libraries. |
| commands.entity.ts     | The code defines a CommandEntity class that extends CreateCommandDto and adds an id property with the ApiProperty decorator.                                                                                                                                |
| commands.interface.ts  | The code defines a Prisma query interface for retrieving commands with a search string and ordering by command ID.                                                                                                                                          |
| commands.module.ts     | The code defines a NestJS module for the commands feature, which includes a controller and a service, as well as a Prisma service.                                                                                                                          |
| commands.service.ts    | The code defines a service class for managing commands, with methods for creating, finding, updating, and deleting commands.                                                                                                                                |

</details>

---

<details><summary>\src\commands\dto</summary>

| File                  | Summary                                                                                                                                                                                                                                                                              |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| create-command.dto.ts | The code defines a CreateCommandDto class for creating a command in a Prisma database, with properties for reference, date, customer, basket, total_ex_taxes, delivery_fees, tax_rate, taxes, and total, as well as an enum property for status and a boolean property for returned. |
| update-command.dto.ts | The UpdateCommandDto class extends the CreateCommandDto class, adding no new functionality but instead inheriting its properties and methods.                                                                                                                                        |

</details>

---

<details><summary>\src\configs</summary>

| File               | Summary                                                                                                                                                                                              |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| jwt.config.ts      | The code defines a function named `getJwtConfig` that returns a `JwtModuleOptions` object with the secret key obtained from the `ConfigService`.                                                     |
| telegram.config.ts | The code defines a function named `getTelegramConfig` that retrieves configuration options for a Telegram bot from a NestJS ConfigService instance and returns an object with the token and chat ID. |

</details>

---

<details><summary>\src\customers</summary>

| File                    | Summary                                                                                                                                                                                                                                                                              |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| customers.controller.ts | The code defines a NestJS controller for managing customers, with CRUD operations and authentication.                                                                                                                                                                                |
| customers.entity.ts     | The code defines a CustomerEntity class that extends the CreateCustomerDto class and adds an id property with the ApiProperty decorator.                                                                                                                                             |
| customers.interface.ts  | The code defines a custom interface for a Prisma query that allows searching customers by name or email.                                                                                                                                                                             |
| customers.module.ts     | The CustomersModule is a NestJS module that provides the CustomersController and CustomersService, as well as the PrismaService, for managing customer data.                                                                                                                         |
| customers.service.ts    | The code defines a CustomersService class that provides CRUD operations for customers using the Prisma ORM. It includes methods for creating, finding, updating, and deleting customers, as well as a findMany method that allows searching for customers by name or other criteria. |

</details>

---

<details><summary>\src\customers\dto</summary>

| File                   | Summary                                                                                                                                                      |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| create-customer.dto.ts | The code defines a DTO (Data Transfer Object) for creating a customer, with properties such as first and last name, email, password, address, birthday, etc. |
| update-customer.dto.ts | The UpdateCustomerDto class extends the CreateCustomerDto class and allows for partial updates of customer data.                                             |

</details>

---

<details><summary>\src\entities</summary>

| File                 | Summary                                                                                                           |
| -------------------- | ----------------------------------------------------------------------------------------------------------------- |
| baseEntity.entity.ts | The code defines a base entity class with a primary key, creation and update timestamps using TypeORM decorators. |

</details>

---

<details><summary>\src\filters</summary>

| File                    | Summary                                                                                                                                                                                                                                     |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| all-exception.filter.ts | The code defines a custom exception filter for NestJS that catches all unhandled exceptions and sends them to a Telegram service or logs them in production, while also providing a standardized response body for certain types of errors. |

</details>

---

<details><summary>\src\invoices\dto</summary>

| File                  | Summary                                                                                                                                      |
| --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| create-invoice.dto.ts | The code defines a TypeScript type alias for the Prisma client's `InvoicesCreateInput` type, which is used to create new invoices.           |
| update-invoice.dto.ts | The code defines a TypeScript type alias for the Prisma.InvoicesUpdateInput type, which is used to update invoice data in a Prisma database. |

</details>

---

<details><summary>\src\invoices</summary>

| File                        | Summary                                                                                                                                                                                                                                                                                                                                           |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| invoices.controller.spec.ts | The code defines a unit test for the InvoicesController class, which is a controller in a NestJS application. It imports the necessary modules and creates a testing module with the controller and service classes, and then retrieves an instance of the controller from the testing module. Finally, it checks that the controller is defined. |
| invoices.controller.ts      | The code defines a NestJS controller for managing invoices, with methods for creating, retrieving, updating, and deleting invoices.                                                                                                                                                                                                               |
| invoices.entity.ts          | The code defines a class called InvoicesEntity, which represents an invoice entity with various properties and methods.                                                                                                                                                                                                                           |
| invoices.interface.ts       | The code defines a query interface for retrieving invoices from a Prisma database, with filtering and sorting capabilities.                                                                                                                                                                                                                       |
| invoices.module.ts          | The InvoicesModule is a NestJS module that provides the InvoicesController and InvoicesService, as well as the PrismaService, for managing invoices.                                                                                                                                                                                              |
| invoices.service.spec.ts    | The code defines a unit test for the InvoicesService class, which is used to test the functionality of the service.                                                                                                                                                                                                                               |
| invoices.service.ts         | The code defines a NestJS service for managing invoices, with methods for creating, finding, updating, and deleting invoices.                                                                                                                                                                                                                     |

</details>

---

<details><summary>\src\middlewares</summary>

| File                         | Summary                                                                                                                                                                                              |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| global-context.middleware.ts | The code defines a NestJS middleware that sets the `pretty`, `site`, `year`, `time`, and `days` variables in the Express request locals object based on configuration values from the ConfigService. |

</details>

---

<details><summary>\src\prisma\classes</summary>

| File          | Summary                                                                                                                                                                                                                                                                                    |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| categories.ts | The code defines a class called Categories with properties for an ID, name, and an array of products.                                                                                                                                                                                      |
| commands.ts   | The code defines a class called Commands in TypeScript, which represents a command or order for a customer. It includes properties such as the customer's ID, reference number, date, basket, total, and status, as well as relationships with other entities like customers and invoices. |
| customers.ts  | The code defines a class called Customers with properties and methods for managing customer data, including first and last name, email, password, address, birthday, and more.                                                                                                             |
| index.ts      | The code defines a PrismaModel namespace that exports various models from different files, including Users, Customers, Categories, Products, Commands, Invoices, and Reviews.                                                                                                              |
| invoices.ts   | The code defines a class called Invoices, which has properties for an ID, date, command, customer, total excluding taxes, delivery fees, tax rate, taxes, and total.                                                                                                                       |
| products.ts   | The code defines a Products class with properties for an ID, category, reference, dimensions, price, thumbnail, image, description, stock, and reviews, as well as a constructor and methods for accessing and manipulating these properties.                                              |
| reviews.ts    | The code defines a class called Reviews, which represents a review of a product by a customer. It includes properties for the review's ID, date, status, command, product, customer, rating, and comment.                                                                                  |
| users.ts      | The code defines a class called Users with properties for an ID, email, password, full name, avatar, role, and admin status.                                                                                                                                                               |

</details>

---

<details><summary>\src\prisma</summary>

| File                   | Summary                                                                                                                                                                                     |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| prisma.decorator.ts    | The code defines a NestJS parameter decorator that converts URL query parameters into a Prisma query object, allowing for filtering, sorting, and pagination of data.                       |
| prisma.module.ts       | The code defines a PrismaModule that exports the PrismaService as a provider and export.                                                                                                    |
| prisma.service.spec.ts | The code defines a unit test for the PrismaService class, which is used to interact with the Prisma ORM.                                                                                    |
| prisma.service.ts      | The code defines a PrismaService class that extends the PrismaClient and implements the OnModuleInit interface, which allows it to connect to the Prisma database on module initialization. |

</details>

---

<details><summary>\src\products\dto</summary>

| File                  | Summary                                                                                                                                                                               |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| create-product.dto.ts | The code defines a DTO (Data Transfer Object) for creating a product, with properties for category ID, reference, dimensions, price, thumbnail, image, description, stock, and sales. |
| update-product.dto.ts | The UpdateProductDto class extends the CreateProductDto class and allows for partial updates of product data.                                                                         |

</details>

---

<details><summary>\src\products</summary>

| File                   | Summary                                                                                                                                                                                                                                                                            |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| products.controller.ts | The code defines a ProductsController class in NestJS, which handles HTTP requests for the products endpoint. It provides CRUD operations for products, including create, read, update, and delete, as well as authentication and pagination.                                      |
| products.entity.ts     | The code defines a ProductEntity class that extends the CreateProductDto class and adds an id property with the ApiProperty decorator.                                                                                                                                             |
| products.interface.ts  | The code defines a Prisma query interface for retrieving products from a database, with a search filter and sorting options.                                                                                                                                                       |
| products.module.ts     | The code defines a NestJS module for the Products feature, which includes a controller and a service, as well as a Prisma service.                                                                                                                                                 |
| products.service.ts    | The code defines a ProductsService class that provides CRUD operations for products using the Prisma ORM. It includes methods for creating, finding, updating, and deleting products, as well as a findMany method that allows searching for products by reference or description. |

</details>

---

<details><summary>\src\reviews\dto</summary>

| File                  | Summary                                                                                                                                                                           |
| --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| create-reviews.dto.ts | The CreateReviewDto class defines a data transfer object (DTO) for creating a review, with properties for date, status, command ID, product ID, customer ID, rating, and comment. |
| update-reviews.dto.ts | The UpdateReviewDto class extends the CreateReviewDto class with a PartialType decorator, allowing for partial updates of review data in a NestJS application.                    |

</details>

---

<details><summary>\src\reviews</summary>

| File                  | Summary                                                                                                                                                                                                                                                                      |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| reviews.controller.ts | The code defines a NestJS controller for managing reviews, with CRUD operations for creating, reading, updating, and deleting reviews. It also includes authentication and authorization using the `@Auth` decorator and Swagger documentation using the `@Api*` decorators. |
| reviews.entity.ts     | The code defines a ReviewsEntity class that extends the CreateReviewDto class and adds an id property with the ApiProperty decorator.                                                                                                                                        |
| reviews.interface.ts  | The code defines a Prisma query interface for retrieving reviews with filtering and sorting capabilities.                                                                                                                                                                    |
| reviews.module.ts     | The ReviewsModule is a NestJS module that provides the ReviewsController and ReviewsService, as well as the PrismaService, for managing reviews in an e-commerce application.                                                                                                |
| reviews.service.ts    | The code defines a ReviewsService class that provides CRUD operations for reviews, using the Prisma ORM to interact with a database.                                                                                                                                         |

</details>

---

<details><summary>\src\telegram</summary>

| File                  | Summary                                                                                                                                                                                     |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| telegram.constants.ts | The code defines a constant variable named TELEGRAM_MODULE_OPTIONS.                                                                                                                         |
| telegram.interface.ts | The code defines an interface for Telegram options and an interface for asynchronous Telegram module options, which can be used to configure the Telegram module in a NestJS application.   |
| telegram.module.ts    | The code defines a TelegramModule for NestJS, which provides a forRootAsync method that allows for asynchronous configuration of the module using an ITelegramModuleAsyncOptions interface. |
| telegram.service.ts   | The code defines a TelegramService class that provides a sendMessage method for sending messages to a Telegram chat using the Telegraf library.                                             |

</details>

---

<details><summary>\src\user\decorators</summary>

| File              | Summary                                                                                                                                                            |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| user.decorator.ts | The code defines a parameter decorator called UserParam that retrieves the user object from the request and returns its properties based on the provided data key. |

</details>

---

<details><summary>\src\user\dto</summary>

| File               | Summary                                                                                                                                                                                                  |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| create-user.dto.ts | The code defines a TypeScript type alias for the Prisma.UsersCreateInput type, which is used to create a new user in a Prisma database.                                                                  |
| password.dto.ts    | The code defines a class called UpdatePassword with two properties: password and newPassword, both of which are strings and are validated using the IsString decorator from the class-validator library. |
| update-user.dto.ts | The code defines a TypeScript type alias for the Prisma.UsersUpdateInput type, which is used to update user data in a Prisma database.                                                                   |
| update.dto.ts      | The code defines a DTO (Data Transfer Object) for updating user information, with properties for email and password, as well as an optional boolean property for admin status.                           |

</details>

---

<details><summary>\src\user</summary>

| File               | Summary                                                                                                                                                                                                                        |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| user.controller.ts | The code defines a NestJS controller for managing users, with various endpoints for creating, reading, updating, and deleting users. It also includes authentication and authorization features using the `@Auth()` decorator. |
| user.entity.ts     | The code defines a TypeORM entity class for a User model, with properties for email, password, name, role, and is_admin.                                                                                                       |
| user.interface.ts  | The code defines a Prisma query interface for retrieving users from a database, with filtering and sorting capabilities.                                                                                                       |
| user.module.ts     | The UserModule is a NestJS module that provides the UserController, UserService, and PrismaService, and exports the UserService for use in other parts of the application.                                                     |
| user.service.ts    | The code defines a UserService class that provides various methods for interacting with the users table in a Prisma database, including creating, updating, and deleting users, as well as retrieving user information.        |

</details>

---

<details><summary>\test</summary>

| File            | Summary                                                                                                                                                                                                                                                       |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| app.e2e-spec.ts | The code is a set of end-to-end tests for an NestJS application, specifically testing the authentication and user controller. It includes tests for various HTTP methods such as GET, POST, DELETE, and verifies the response status codes and body contents. |

</details>

---

## 🚀 Getting Started

To get started with this Nest.js project, follow these steps:<br>

1. Install the dependencies by running `yarn` or `npm install`.
2. Set up the database by running `prisma generate` and `prisma migrate dev`.
3. Start the application by running `yarn start` or `npm run start`.
4. Test the application by running `yarn test` or `npm run test`.
5. Use the API endpoints to interact with the application.

Note: This guide assumes that you have Node.js and Yarn installed on your system. If you don't have them, you can download them from the official websites.

---

Generated with ❤️ by [ReadMeAI](https://www.readmeai.co/).
