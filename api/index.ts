// 3rd Party Imports
import express from "express";
import path from "path";
// Leagueify Imports
import accounts from "./accounts";
import leagues from "./leagues";
import players from "./players";
// Variable Declarations
const router = express.Router();

// API Root Middleware
router.use((req, res, next) => {
  console.log(`${new Date().toISOString()} :: ${req.method} :: ${req.originalUrl}`);
  next();
});

// Serve OpenAPI Docs
router.get("/", (req, res) => {
  // #swagger.ignore = true
  res.redirect(301, "/");
});

// Serve OpenAPI JSON
router.get("/openapi.json", (req, res) => {
  // #swagger.ignore = true
  res.sendFile(path.join(import.meta.dir + "/openapi.json"));
});

// Use the imported routes
router.use("/accounts", accounts);
router.use("/leagues", leagues);
router.use("/players", players);

export default router;
