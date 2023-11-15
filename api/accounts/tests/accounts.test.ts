import { test, expect } from "bun:test";

test("GET: /accounts", async () => {
  const response = await fetch("http://localhost/api/accounts", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  const body = await response.json();

  expect(body).toBe("Accounts");
});

test("POST: /accounts", async () => {
  const response = await fetch("http://localhost/api/accounts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
  const body = await response.json();

  expect(body).toBe("Create Account");
});

test("PUT: /accounts", async () => {
  const response = await fetch("http://localhost/api/accounts", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
  });
  const body = await response.json();

  expect(body).toBe("Update Account");
});

test("POST: /accounts/login", async () => {
  const response = await fetch("http://localhost/api/accounts/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
  const body = await response.json();

  expect(body).toBe("Login Account");
});

test("POST: /accounts/logout", async () => {
  const response = await fetch("http://localhost/api/accounts/logout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
  const body = await response.json();

  expect(body).toBe("Logout Account");
});
