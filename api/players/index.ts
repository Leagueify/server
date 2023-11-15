import express from "express";
const router = express.Router();

router
  .route("/")
  .get((req, res) => {
    // #swagger.tags = ['Players']
    // #swagger.summary = 'Return '
    // #swagger.description = 'Return or Search for Leagues'
    res.json("Players");
  })
  .post((req, res) => {
    // #swagger.tags = ['Players']
    // #swagger.summary = 'Some summary...'
    // #swagger.description = 'Create a new League'
    res.json("Create Player");
  })
  .put((req, res) => {
    // #swagger.tags = ['Players']
    // #swagger.summary = 'Some summary...'
    // #swagger.description = 'Update a League'
    res.json("Update Player");
  });

export default router;
