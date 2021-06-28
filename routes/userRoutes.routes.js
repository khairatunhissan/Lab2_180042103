const express = require('express');
const router = express.Router();
const userController= require('../controller/userController.controller');

router.get ('/login', userController.getLoginPage);
router.get ('/register', userController.getRegisterPage);

module.exports = router;