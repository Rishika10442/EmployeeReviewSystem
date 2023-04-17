const express = require('express');
const router = express.Router();
const passport=require('passport');

const employeeController = require("../controllers/employeeController");
const adminController=require("../controllers/adminController");
const homeController = require("../controllers/homeController")

router.get("/delete/:id",employeeController.deleteEmployee);
router.get("/add-new-employee",homeController.newEmployee);
router.get("/update/:id",adminController.updatePage);
router.get("/assign/:id",adminController.assignPage);

module.exports = router;