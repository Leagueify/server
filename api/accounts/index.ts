// 3rd Party Imports
import express from "express";
import * as mongoose from "mongoose";
// Leagueify Imports
import { Account } from "./schema";
// Variable Declarations
let response: object;
const router = express.Router();
let statusCode: number;
router
  .route("/")
  .get((req, res) => {
    // #swagger.tags = ['Accounts']
    // #swagger.summary = 'Return Account Information'
    // #swagger.description = 'Return Account Information'
    res.json("Accounts");
  })
  .post(async (req, res) => {
    // #swagger.tags = ['Accounts']
    // #swagger.summary = 'Create a new Account'
    // #swagger.description = 'Create a new Account'
    /*  #swagger.requestBody = {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/accountSchema" }
            }
          }
        }
      */
    /*
          #swagger.responses[201] = {
            description: 'The Account was created successfully',
            schema: { "id": "1234567890" }
          }
          #swagger.responses[400] = {
            description: 'Bad API Request',
            schema: { "error": "Invalid JSON body" }
          }
        */
    const account = new Account({
      name: req.body.name,
      role: req.body.role,
      email: req.body.email,
      password: req.body.password,
      phone: req.body.phone,
      dateOfBirth: req.body.dateOfBirth,
      coach: req.body.coach,
      volunteer: req.body.volunteer,
    });

    account.validateSync();

    if (!account.errors) {
      await mongoose.connect(
        "mongodb://root:example@leagueify-database-dev:27017/leagueify-server?authSource=admin",
      );
      await account.save();
      await mongoose.disconnect();
      statusCode = 201;
      response = { accountId: account.id, apiKey: "1234567890" };
    } else {
      statusCode = 400;
      response = { error: "Missing required fields" };
    }

    res.status(statusCode).json(response);
  })
  .put((req, res) => {
    // #swagger.tags = ['Accounts']
    // #swagger.summary = 'Update an Account'
    // #swagger.description = 'Update an Account'
    res.json("Update Account");
  });

router.route("/login").post((req, res) => {
  // #swagger.tags = ['Accounts']
  // #swagger.summary = 'Login to an Account'
  // #swagger.description = 'Login to an Account'
  res.json("Login Account");
});

router.route("/logout").post((req, res) => {
  // #swagger.tags = ['Accounts']
  // #swagger.summary = 'Logout of an Account'
  // #swagger.description = 'Logout of an Account'
  res.json("Logout Account");
});

export default router;
