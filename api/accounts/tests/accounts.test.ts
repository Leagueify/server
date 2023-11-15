// 3rd Party Imports
import { test, expect } from "bun:test";
import supertest from "supertest";
// Variable Declarations
import app from "../../../index.ts";
const request = supertest(app);

test("GET: /accounts", async () => {
  const response = await request.get("/api/accounts");

  expect(response.body).toBe("Accounts");
});

test("POST: /accounts", async () => {
  const response = await request.post("/api/accounts");

  expect(response.body).toBe("Create Account");
});

test("PUT: /accounts", async () => {
  const response = await request.put("/api/accounts");

  expect(response.body).toBe("Update Account");
});

test("POST: /accounts/login", async () => {
  const response = await request.post("/api/accounts/login");

  expect(response.body).toBe("Login Account");
});

test("POST: /accounts/logout", async () => {
  const response = await request.post("/api/accounts/logout");

  expect(response.body).toBe("Logout Account");
});
