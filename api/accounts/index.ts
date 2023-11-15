import express from "express";
const router = express.Router();

router
  .route("/")
  .get((req, res) => {
    // #swagger.tags = ['Accounts']
    // #swagger.summary = 'Return Account Information'
    // #swagger.description = 'Return Account Information'
    res.json("Accounts");
  })
  .post((req, res) => {
    // #swagger.tags = ['Accounts']
    // #swagger.summary = 'Create a new Account'
    // #swagger.description = 'Create a new Account'
    res.json("Create Account");
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
