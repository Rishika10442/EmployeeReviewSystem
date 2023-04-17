const express = require('express');

const router = express.Router();

const employeeController = require("../controllers/employeeController");

router.post("/create/:id",employeeController.createReview)
router.get("/giveReview/:id",employeeController.reviewPage);
router.get("/edit/:id",employeeController.editReviewPage);
router.get("/delete/:id",employeeController.deleteReview);
module.exports = router;