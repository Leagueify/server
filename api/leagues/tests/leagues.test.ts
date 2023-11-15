// 3rd Party Imports
import { test, expect } from "bun:test";
import supertest from "supertest";
// Variable Declarations
import app from "../../../index.ts";
const request = supertest(app);

test("GET: /leagues", async () => {
  const response = await request.get("/api/leagues");

  expect(response.body).toBe("Leagues");
});

test("POST: /leagues", async () => {
  const response = await request.post("/api/leagues");

  expect(response.body).toBe("Create League");
});

test("PUT: /leagues", async () => {
  const response = await request.put("/api/leagues");

  expect(response.body).toBe("Update League");
});
