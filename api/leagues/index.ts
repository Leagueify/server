import express from "express";
const router = express.Router();

router
  .route("/")
  .get((req, res) => {
    // #swagger.tags = ['Leagues']
    // #swagger.summary = 'Return or Search for Leagues'
    // #swagger.description = 'Return or Search for League information'
    res.json("Leagues");
  })
  .post((req, res) => {
    // #swagger.tags = ['Leagues']
    // #swagger.summary = 'Create a new League'
    // #swagger.description = 'Create a new League'
    res.json("Create League");
  })
  .put((req, res) => {
    // #swagger.tags = ['Leagues']
    // #swagger.summary = 'Update a League'
    // #swagger.description = 'Update a League'
    res.json("Update League");
  });

export default router;
