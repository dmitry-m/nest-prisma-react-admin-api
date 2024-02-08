import { Logger, MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { APP_FILTER } from "@nestjs/core";
import { TypeOrmModule } from "@nestjs/typeorm";

import { AuthModule } from "./auth/auth.module";
import { CategoriesModule } from "./categories/categories.module";
import { CommandsModule } from "./commands/commands.module";
import { getTelegramConfig } from "./configs/telegram.config";
import { getOrmOptions } from "./configs/typeOrm.config";
import { CustomersModule } from "./customers/customers.module";
import { AllExceptionsFilter } from "./filters/all-exception.filter";
import { InvoicesModule } from "./invoices/invoices.module";
import { GlobalContextMiddleware } from "./middlewares/global-context.middleware";
import { PrismaModule } from "./prisma/prisma.module";
import { ProductsModule } from "./products/products.module";
import { ReviewsModule } from "./reviews/reviews.module";
import { TelegramModule } from "./telegram/telegram.module";
import { UserModule } from "./user/user.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getOrmOptions,
    }),
    TelegramModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getTelegramConfig,
    }),
    AuthModule,
    UserModule,
    CustomersModule,
    InvoicesModule,
    ProductsModule,
    CommandsModule,
    CategoriesModule,
    ReviewsModule,
  ],
  providers: [
    Logger,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(GlobalContextMiddleware).forRoutes("*");
  }
}
