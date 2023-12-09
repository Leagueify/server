// 3rd Party Imports
import express from "express";
import rateLimit from "express-rate-limit";
import * as jwt from "jsonwebtoken";
import * as mongoose from "mongoose";
// Leagueify Imports
import { Account } from "../accounts/schema";
import { League } from "./schema";
// Variable Declarations
const DATABASE_URI: string = Bun.env.DATABASE_URI || "";
const JWT_SECRET: string = Bun.env.JWT_SECRET;
let response: object;
const router = express.Router();
let statusCode: number;

router.route("/").post(
  rateLimit({
    windowMS: 60 * 1000, // 1 minute
    max: 5, // 5 requests per minute
    skipFailedRequests: true,
    validate: { ip: false },
    message: "Too many requests, please try again later.",
  }),
  async (req, res) => {
    /* 
     #swagger.tags = ['Leagues']
     #swagger.summary = 'Create League'
     #swagger.description = 'Create a new League'
     #swagger.security = [{
       "bearerAuth": []
     }]
     #swagger.requestBody = {
       required: true,
       content: {
         "application/json": {
           schema: { $ref: "#/components/schemas/leaguesSchema" }
         }
       }
     }
     #swagger.responses[201] = {
       description: 'League was created successfully',
       content: {
         "application/json": {
	   schema: {
	     "leagueID": "655af1cac5a714a5f345e2b0",
	   }
         }
       }
     }
     #swagger.responses[400] = {
       description: 'Fields returned via the message array are required and were either missing or empty.',
       content: {
         "application/json": {
	   schema: {
	     "message": [
	       "Missing required field: 'leagueName'",
	     ]
	   }
         }
       }
     }
     */
    try {
      await mongoose.connect(DATABASE_URI);
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        throw new jwt.JsonWebTokenError("Unauthorized");
      }
      const _jwtToken = jwt.decode(token);
      const account = await Account.findById(_jwtToken.acc);
      jwt.verify(req.headers.authorization?.split(" ")[1], `${account.token}.${JWT_SECRET}`);
      const league = new League(req.body);
      await league.save();
      await mongoose.disconnect();

      statusCode = 201;
      response = {
        leagueID: league._id,
      };
    } catch (exception: any) {
      statusCode = 400;
      response = {
        message: [],
      };
      for (let _error in exception.errors) {
        response.message.push(exception.errors[_error].message);
      }
      if (exception instanceof jwt.JsonWebTokenError) {
        statusCode = 401;
        response = {
          message: "Unauthorized",
        };
      }
    }
    res.status(statusCode).json(response);
  },
);

export default router;
