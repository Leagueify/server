// 3rd Party Imports
import { afterAll, beforeAll, expect, test } from "bun:test";
import * as jwt from "jsonwebtoken";
import * as mongoose from "mongoose";
import supertest from "supertest";
// Leagueify Imports
import { League } from "../schema";
import app from "../../../index.ts";
// Variable Declarations
const DATABASE_URI: string = Bun.env.DATABASE_URI || "";
const JWT_SECRET: string = Bun.env.JWT_SECRET || "Leagueify is Never Gonna Give You Up";
const initialLeagueId: string = "1234567890";
const request = supertest(app);
const requiredFields: string[] = ["leagueName", "sport", "divisions", "positions"];
let token: string;

afterAll(async () => {
  await mongoose.connect(DATABASE_URI);
  const league = await new League({});
  await league.db.dropCollection("accounts");
  await league.db.dropCollection("leagues");
  await mongoose.disconnect();
});

beforeAll(async () => {
  await mongoose.connect(DATABASE_URI);
  const league = await new League({});
  await league.db.dropCollection("accounts");
  await league.db.dropCollection("leagues");
  await mongoose.disconnect();

  const response = await request.post("/api/accounts").send({
    firstName: "Test",
    lastName: "League",
    email: "test+leagues@leagueify.org",
    password: "Test123!",
    dateOfBirth: "1990-01-01",
    phone: "800-555-1234",
  });
  token = response.body.token;
});

test("Create League", async () => {
  var response = await request
    .post("/api/leagues")
    .send({
      leagueName: "Test Leagueify League",
      sport: "Hockey",
      divisions: [
        {
          name: "Youth Division",
          open: false,
          minAge: 5,
          maxAge: 10,
        },
        {
          name: "Adult Division",
          open: false,
          minAge: 18,
          maxAge: 100,
        },
      ],
      positions: ["Skater", "Goalie"],
    })
    .set("Authorization", `Bearer ${token}`);
  expect(response.status).toBe(201);
  expect(response.body).toHaveProperty("leagueID");
  expect(response.body.leagueID).toBeDefined();
});

test("Create League without token should error", async () => {
  var response = await request.post("/api/leagues").send({
    leagueName: "Test Leagueify League",
    sport: "Hockey",
    divisions: [
      {
        name: "Youth Division",
        open: false,
        minAge: 5,
        maxAge: 10,
      },
      {
        name: "Adult Division",
        open: false,
        minAge: 18,
        maxAge: 100,
      },
    ],
    positions: ["Skater", "Goalie"],
  });
  expect(response.status).toBe(401);
  expect(response.body).toHaveProperty("message");
  expect(response.body.message).toContain("Unauthorized");
});

test("Create League with invalid token should error", async () => {
  var response = await request
    .post("/api/leagues")
    .send({
      leagueName: "Test Leagueify League",
      sport: "Hockey",
      divisions: [
        {
          name: "Youth Division",
          open: false,
          minAge: 5,
          maxAge: 10,
        },
        {
          name: "Adult Division",
          open: false,
          minAge: 18,
          maxAge: 100,
        },
      ],
      positions: ["Skater", "Goalie"],
    })
    .set("Authorization", `Bearer ${token}invalid`);
  expect(response.status).toBe(401);
  expect(response.body).toHaveProperty("message");
  expect(response.body.message).toContain("Unauthorized");
});

test("Create League with invalid sport should error", async () => {
  var response = await request
    .post("/api/leagues")
    .send({
      leagueName: "Test Leagueify League",
      sport: "Invalid Sport",
      divisions: [
        {
          name: "Youth Division",
          open: false,
          minAge: 5,
          maxAge: 10,
        },
        {
          name: "Adult Division",
          open: false,
          minAge: 18,
          maxAge: 100,
        },
      ],
      positions: ["Skater", "Goalie"],
    })
    .set("Authorization", `Bearer ${token}`);
  expect(response.status).toBe(400);
  expect(response.body).toHaveProperty("message");
  expect(response.body.message).toContain("Please select a supported sport");
});

requiredFields.forEach((field) => {
  test(`Create League without ${field} should error`, async () => {
    var response = await request
      .post("/api/leagues")
      .send({
        leagueName: field === "leagueName" ? "" : "Test Leagueify League",
        sport: field === "sport" ? "" : "Hockey",
        divisions:
          field === "divisions"
            ? []
            : [
                {
                  name: "Youth Division",
                  open: false,
                  minAge: 5,
                  maxAge: 10,
                },
                {
                  name: "Adult Division",
                  open: false,
                  minAge: 18,
                  maxAge: 100,
                },
              ],
        positions: field === "positions" ? [] : ["Skater", "Goalie"],
      })
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toContain(`Missing required field: ${field}`);
  });
});
