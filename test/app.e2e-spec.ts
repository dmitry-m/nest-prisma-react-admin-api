import { INestApplication, ValidationPipe } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import * as request from "supertest";

import { AppModule } from "../src/app.module";
import { AuthInterface } from "../src/auth/auth.interface";
import { AuthDto } from "../src/auth/dto/auth.dto";

function makeId(min: number, max: number) {
  return Math.random().toString(36).slice(min, max);
}

const adminCredentials: AuthDto = {
  email: "email@email.email",
  password: "1234568",
};

const credentials: AuthDto = {
  email: `${makeId(2, 10)}@${makeId(2, 10)}.email`,
  password: makeId(2, 10),
};

const badCredentials = {
  email: "",
  password: "",
};

describe("Auth And User Controller (e2e)", () => {});
