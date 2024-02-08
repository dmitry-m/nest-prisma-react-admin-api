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

describe("Auth And User Controller (e2e)", () => {
  let app: INestApplication;
  let refreshToken: string;
  let userId: number;
  let adminUserId: number;
  let adminAccessToken: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    app.setGlobalPrefix("api");
    await app.init();
  });

  it(`/api/404 (GET) must be "Not found"`, () => {
    return request(app.getHttpServer())
      .get(`/api/${makeId(2, 4)}`)
      .expect(404);
  });

  it("/api/auth/signup (POST) - bad credentials", () => {
    return request(app.getHttpServer()).post("/api/auth/signup").send(badCredentials).expect(400);
  });

  it("/api/auth/signup (POST) - success", () => {
    return request(app.getHttpServer())
      .post("/api/auth/signup")
      .send(credentials)
      .expect(200)
      .then(({ body }: { body: AuthInterface }) => {
        expect(body.tokens.accessToken).toBeDefined();
        expect(body.tokens.refreshToken).toBeDefined();
      });
  });

  it("/api/auth/login (POST) - success", () => {
    return request(app.getHttpServer())
      .post("/api/auth/login")
      .send(credentials)
      .expect(200)
      .then(({ body }: { body: AuthInterface }) => {
        expect(body.tokens.accessToken).toBeDefined();
        expect(body.tokens.refreshToken).toBeDefined();
        expect(body.user.id).toBeDefined();
        userId = body.user.id;
        refreshToken = body.tokens.refreshToken;
      });
  });

  it("/api/auth/token (POST) - success", () => {
    return request(app.getHttpServer())
      .post("/api/auth/token")
      .send({ refreshToken })
      .expect(200)
      .then(({ body }: { body: AuthInterface }) => {
        expect(body.tokens.accessToken).toBeDefined();
        expect(body.tokens.refreshToken).toBeDefined();
      });
  });

  it("/api/auth/login (POST) - admin success", () => {
    return request(app.getHttpServer())
      .post("/api/auth/login")
      .send(adminCredentials)
      .expect(200)
      .then(({ body }: { body: AuthInterface }) => {
        expect(body.tokens.accessToken).toBeDefined();
        expect(body.tokens.refreshToken).toBeDefined();
        adminAccessToken = body.tokens.accessToken;
        adminUserId = body.user.id;
      });
  });

  it("/api/users/:id (DELETE) - success", () => {
    return request(app.getHttpServer())
      .delete(`/api/users/${userId}`)
      .set("Authorization", `Bearer ${adminAccessToken}`)
      .expect(204);
  });

  it("/api/users/:id (DELETE) - conflict", () => {
    return request(app.getHttpServer())
      .delete(`/api/users/${adminUserId}`)
      .set("Authorization", `Bearer ${adminAccessToken}`)
      .expect(409);
  });

  afterAll(async () => {
    await app.close();
  });
});
