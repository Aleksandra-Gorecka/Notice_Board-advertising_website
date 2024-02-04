const express = require('express');
const router = express.Router();
const UserController = require('../controllers/users.controller');

router.get('/auth/user', UserController.getUser);
//router.post('/auth/register', UserController.registerUser);
//router.post('/auth/login', UserController.checkUser);

module.exports = router;