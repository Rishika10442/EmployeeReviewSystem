const express = require('express');
const router = express.Router();
const passport=require('passport');

const employeeController = require("../controllers/employeeController");

router.post("/create",employeeController.createEmployee);
router.post("/create-session",passport.authenticate('local',
{
    failureRedirect:'/sign-in'
}),employeeController.createSession);
router.get("/home",passport.checkAuthentication,employeeController.home);
router.post("/update/:id",employeeController.updateEmployeeData)
router.post("/new-review/:id",employeeController.addReview);
router.post("/edit-review/:id",employeeController.editReview);

module.exports = router;