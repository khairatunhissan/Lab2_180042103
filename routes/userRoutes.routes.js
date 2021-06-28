const express = require('express');
const router = express.Router();
const userController= require('../controller/userController.controller');
const isLoggedin=require('../middlewares/auth.middleware')

router.get ('/login', userController.getLoginPage);
router.get ('/register', userController.getRegisterPage);
router.post('/register',userController.postRegisterPage)
router.post('/login',userController.postLogin)
router.get('/dashboard',isLoggedin,userController.getDashboard)


module.exports = router;