// 3rd Party Imports
import { test, expect, afterAll } from "bun:test";
import supertest from "supertest";
import * as mongoose from "mongoose";
// Leagueify Imports
import { EmailConfig } from "../schema";
// Variable Declarations
const DATABASE_URI: string = Bun.env.DATABASE_URI || "";
import app from "../../../index.ts";
const request = supertest(app);

afterAll(async () => {
  await mongoose.connect(DATABASE_URI);
  const config = new EmailConfig({});
  await config.db.dropCollection("emailconfigs");
  await mongoose.disconnect();
})

test("Send Email", async () => {
  const response = await fetch("http://localhost/api/email", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({}),
  });
  const body = await response.json();

  expect(body).toBe("Send Emails");
});

test("Create an email configuration", async () => {
  const response = await request.post("/api/email/config").send({
    outboundEmail: "noreply@leagueify.org",
    smtpHost: "smtp.sendgrid.net",
    smtpPort: 465,
    smtpUser: "smtpuser",
    smtpPass: "SG.smtppass",
  });

  expect(response.status).toBe(201);
  expect(response.body).toBeTypeOf("object");
  expect(response.body).toHaveProperty("id");
});
