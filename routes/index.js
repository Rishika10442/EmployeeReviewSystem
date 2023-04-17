const express = require('express');

const router = express.Router();
const homeController = require("../controllers/homeController")

router.get('/',homeController.start);
router.get("/sign-up",homeController.signUpPage);
router.get("/sign-in",homeController.signInPage);

//to start with an admin, make the first admin through this
router.get("/first-admin",homeController.specialAdmin);

router.get("/sign-out",homeController.destroySession);



router.use('/employee',require('./employee'));
router.use('/admin',require('./admin'));
router.use('/review',require('./review'));

module.exports = router;