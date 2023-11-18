// 3rd Party Imports
import express from "express";
import * as mongoose from "mongoose";
// Leagueify Imports
import { EmailConfig } from "./schema";
// Variable Declarations
const DATABASE_URI: string = Bun.env.DATABASE_URI || "";
let response: object;
const router = express.Router();
let statusCode: number;

router
  .route("/")
  .get((req, res) => {
    // #swagger.tags = ['Email']
    // #swagger.summary = 'Return Email Information'
    // #swagger.description = 'Return Email Information'
    res.json("Email");
  })
  .post((req, res) => {
    // #swagger.tags = ['Email']
    // #swagger.summary = 'Create a new Email'
    // #swagger.description = 'Create a new Email'
    res.json("Send Emails");
  })
  .put((req, res) => {
    // #swagger.tags = ['Email']
    // #swagger.summary = 'Update an Email'
    // #swagger.description = 'Update an Email'
    res.json("Update Email");
  });

router.route("/config").post(async (req, res) => {
  // #swagger.tags = ['Email']
  // #swagger.summary = 'Create a new Email Config'
  // #swagger.description = 'Create a new Email Config'
  /*  #swagger.parameters['apiKey'] = {
        in: 'header',
        description: 'Account API Key for Authentication',
        required: true,
        type: 'string',
        schema: '1234567890'
      }
    */
  /*
      #swagger.requestBody = {
        required: true,
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/emailSchema" }
          }
        }
      }
    */
  /*
      #swagger.responses[201] = {
        description: 'The Email Config was created successfully',
        schema: { "id": "1234567890" }
      }
      #swagger.responses[400] = {
        description: 'Bad API Request',
        schema: { "error": "Missing required fields" }
      }
    */
  const config = new EmailConfig({
    outboundEmail: req.body.outboundEmail,
    smtpHost: req.body.smtpHost,
    smtpPort: req.body.smtpPort,
    smtpUser: req.body.smtpUser,
    smtpPass: req.body.smtpPass,
  });

  config.validateSync();

  if (!config.errors) {
    await mongoose.connect(DATABASE_URI);
    await config.save();
    await mongoose.disconnect();
    statusCode = 201;
    response = { id: config.id };
  } else {
    statusCode = 400;
    response = { error: "Missing required fields" };
  }

  res.status(statusCode).json(response);
});

router
  .route("/config/:id")
  .get((req, res) => {
    // #swagger.tags = ['Email']
    // #swagger.summary = 'Return Email Config Information'
    // #swagger.description = 'Return Email Config Information'
    res.json("Email Config");
  })
  .put((req, res) => {
    // #swagger.tags = ['Email']
    // #swagger.summary = 'Update an Email Config'
    // #swagger.description = 'Update an Email Config'
    res.json("Update Email Config");
  });

export default router;
