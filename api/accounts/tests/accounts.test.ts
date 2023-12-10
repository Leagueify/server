// 3rd Party Imports
import { afterAll, test, expect, beforeAll } from "bun:test";
import * as jwt from "jsonwebtoken";
import * as mongoose from "mongoose";
import supertest from "supertest";
// Leagueify Imports
import { Account } from "../schema";
import app from "../../../index.ts";
// Variable Declarations
const DATABASE_URI: string = Bun.env.DATABASE_URI || "";
const JWT_SECRET: string = Bun.env.JWT_SECRET || "Leagueify is Never Gonna Give You Up";
const initialLeagueId: string = "1234567890";
const request = supertest(app);
const requiredFields: string[] = [
  "firstName",
  "lastName",
  "email",
  "password",
  "phone",
  "dateOfBirth",
];

afterAll(async () => {
  await mongoose.connect(DATABASE_URI);
  const account = new Account({});
  await account.db.dropCollection("accounts");
  await mongoose.disconnect();
});

beforeAll(async () => {
  await mongoose.connect(DATABASE_URI);
  const account = new Account({});
  await account.db.dropCollection("accounts");
  await mongoose.disconnect();
});

test("Create Account", async () => {
  var response = await request.post("/api/accounts").send({
    firstName: "John",
    lastName: "Doe",
    email: "test+create-account@leagueify.org",
    password: "Test123!",
    phone: "800-555-1234",
    dateOfBirth: "1990-01-01",
  });
  expect(response.status).toBe(201);
  expect(response.body).toHaveProperty("token");
  expect(response.body.token).toBeDefined();
});

test("Create Account with duplicate email should error", async () => {
  var response = await request.post("/api/accounts").send({
    firstName: "John",
    lastName: "Doe",
    email: "test+create-account-duplicate-email@leagueify.org",
    password: "Test123!",
    phone: "800-555-1234",
    dateOfBirth: "1990-01-01",
  });

  response = await request.post("/api/accounts").send({
    firstName: "John",
    lastName: "Doe",
    email: "test+create-account-duplicate-email@leagueify.org",
    password: "Test123!",
    phone: "800-555-1234",
    dateOfBirth: "1990-01-01",
  });
  expect(response.status).toBe(400);
  expect(response.body).toHaveProperty("message");
  expect(response.body.message).toContain("An account with that email already exists");
});

requiredFields.forEach((field: string) => {
  test(`Create Account without ${field} should error`, async () => {
    var response = await request.post("/api/accounts").send({
      firstName: field === "firstName" ? undefined : "John",
      lastName: field === "lastName" ? undefined : "Doe",
      email:
        field === "email"
          ? undefined
          : `test+create-account-missing-required-${field}@leagueify.org`,
      password: field === "password" ? undefined : "Test123!",
      phone: field === "phone" ? undefined : "800-555-1234",
      dateOfBirth: field === "dateOfBirth" ? undefined : "1990-01-01",
    });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toContain(`missing required field: ${field}`);
  });
});
