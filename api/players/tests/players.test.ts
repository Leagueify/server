// 3rd Party Imports
import { test, expect } from "bun:test";
import supertest from "supertest";
// Variable Declarations
import app from "../../../index.ts";
const request = supertest(app);

test("GET: /players", async () => {
  const response = await request.get("/api/players");

  expect(response.body).toBe("Players");
});

test("POST: /players", async () => {
  const response = await request.post("/api/players");

  expect(response.body).toBe("Create Player");
});

test("PUT: /players", async () => {
  const response = await request.put("/api/players");

  expect(response.body).toBe("Update Player");
});
