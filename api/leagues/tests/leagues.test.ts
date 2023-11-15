import { test, expect } from "bun:test";

test("GET: /leagues", async () => {
  const response = await fetch("http://localhost/api/leagues", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  const body = await response.json();

  expect(body).toBe("Leagues");
});

test("POST: /leagues", async () => {
  const response = await fetch("http://localhost/api/leagues", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
  const body = await response.json();

  expect(body).toBe("Create League");
});

test("PUT: /leagues", async () => {
  const response = await fetch("http://localhost/api/leagues", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
  });
  const body = await response.json();

  expect(body).toBe("Update League");
});
