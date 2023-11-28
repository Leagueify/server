// 3rd Party Imports
import express from "express";
import * as jwt from "jsonwebtoken";
import * as mongoose from "mongoose";
// Leagueify Imports
import { Account } from "./schema";
// Variable Declarations
const DATABASE_URI: string = Bun.env.DATABASE_URI || "";
const JWT_SECRET: string = Bun.env.JWT_SECRET;
let response: object;
const router = express.Router();
let statusCode: number;

router.route("/").post(async (req, res) => {
  /*
    #swagger.tags = ['Accounts']
    #swagger.summary = 'Create Account'
    #swagger.description = 'Create a new Account'
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/accountsSchema" }
        }
      }
    }
    #swagger.responses[201] = {
      description: 'The Account was created successfully',
      content: {
        "application/json": {
          schema: {
            "id": "655af3cac5a714a7c077e2b0",
            "accessToken": "< JWT Token >"
          }
        }
      }
    }
    #swagger.responses[400] = {
      description: 'Fields returned via the detail array are required and were either missing or empty.',
      content: {
        "application/json": {
          schema: { 
            "message": [
              "missing required field: firstName",
              "An account with that email already exists"
            ]
          }
        }
      }
    }
  */

  try {
    await mongoose.connect(DATABASE_URI);
    const account = new Account(req.body);
    account.password = req.body.password ? await hashPassword(account.password) : "";
    account.token = await createToken(8);
    account.isActive = true;
    await account.save();
    await mongoose.disconnect();

    const jwtToken = jwtCreation(account);

    // This is where we would send account creation email
    statusCode = 201;
    response = {
      token: jwtToken,
    };
  } catch (exception: any) {
    statusCode = 400;
    response = {
      message: [],
    };
    for (let _error in exception.errors) {
      response.message.push(exception.errors[_error].message);
    }
  }
  res.status(statusCode).json(response);
});

export default router;

async function createToken(length: number): Promise<string> {
  let result = "";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

async function getTargetAccount(accountId: string) {
  let account;
  try {
    account = await Account.findById(accountId);
  } catch (exception) {
    throw new Error("unauthorized");
  }
}

async function hashPassword(password: string): Promise<string> {
  const bcryptHash = await Bun.password.hash(password, {
    algorithm: "bcrypt",
    cost: 12,
  });

  return bcryptHash;
}

function isAdmin(account: string | jwt.JwtPayload): boolean {
  return ["ADMIN", "MASTER_ADMIN"].includes(account.role);
}

function isNotAdmin(account: string | jwt.JwtPayload): boolean {
  return !["ADMIN", "MASTER_ADMIN"].includes(account.role);
}

function jwtCreation(account: Account): string {
  return jwt.sign(
    {
      acc: account.id,
      role: account.role,
    },
    `${account.token}.${JWT_SECRET}`,
    {
      algorithm: "HS512",
      expiresIn: "14d",
      jwtid: account.token?.toString(),
    },
  );
}

function jwtVerification(token: string, account: Account): string | jwt.JwtPayload {
  return jwt.verify(token, `${account.token}.${JWT_SECRET}`);
}

function sendResponse(res: express.Response, statusCode: number, response: object) {
  res.status(statusCode).json(response);
}

async function setAccountRole(account: Account): Promise<string> {
  let role = "USER";

  const accounts = await Account.find({ leagueId: account.leagueId });

  if (!accounts || accounts.length === 0) {
    role = "MASTER_ADMIN";
  }

  return role;
}
