import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const getOrmOptions = (configService: ConfigService): TypeOrmModuleOptions => {
  return {
    type: "postgres",
    host: configService.get<string>("DB_HOST"),
    database: configService.get<string>("DB_NAME"),
    username: configService.get<string>("DB_USER"),
    password: configService.get<string>("DB_PASS"),
    entities: ["dist/**/*.entity.js"],
    synchronize: true,
    autoLoadEntities: true,
    logging: false,
  };
};
