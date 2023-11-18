// 3rd Party Imports
import bodyParser from "body-parser";
import express from "express";
import rateLimit from "express-rate-limit";
import path from "path";
// 3rd Party Types
import { NextFunction, Request, Response } from "express";
// Leagueify Imports
import accounts from "./accounts";
import email from "./email";
import leagues from "./leagues";
import players from "./players";
// Variable Declarations
const rateLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 Minute
  max: 20, // 10 requests per minute
  skipFailedRequests: true,
  message: "Too many requests, please try again later.",
});
const router = express.Router();

// Serve OpenAPI Docs
router.get("/", (req, res) => {
  // #swagger.ignore = true
  res.redirect(301, "/");
});

// Serve OpenAPI JSON
router.get("/openapi.json", rateLimiter, (req, res) => {
  // #swagger.ignore = true
  res.sendFile(path.join(import.meta.dir + "/openapi.json"));
});

// Parse JSON in request body
router.use(bodyParser.json());

// API Root Middleware
router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  // Validate JSON Body
  if (err) {
    res.status(400).json({ error: "Invalid JSON body" });
  } else {
    console.log(`${new Date().toISOString()} :: ${req.method} :: ${req.originalUrl}`);
    next();
  }
});

router.use((req, res, next) => {
  // Validate JSON Body
  if (req.body) {
    try {
      JSON.parse(JSON.stringify(req.body));
    } catch (e) {
      res.status(400).json({ error: "Invalid JSON body" });
      return;
    }
  }
  console.log(`${new Date().toISOString()} :: ${req.method} :: ${req.originalUrl}`);
  next();
});

// Use the imported api routes
router.use("/accounts", accounts);
router.use("/email", email);
router.use("/leagues", leagues);
router.use("/players", players);

export default router;
