import { test, expect } from "bun:test";

test("GET: /players", async () => {
  const response = await fetch("http://localhost/api/players", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  const body = await response.json();

  expect(body).toBe("Players");
});

test("POST: /players", async () => {
  const response = await fetch("http://localhost/api/players", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
  const body = await response.json();

  expect(body).toBe("Create Player");
});

test("PUT: /players", async () => {
  const response = await fetch("http://localhost/api/players", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
  });
  const body = await response.json();

  expect(body).toBe("Update Player");
});
