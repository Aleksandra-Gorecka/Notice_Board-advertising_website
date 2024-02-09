const express = require('express');
const router = express.Router();
const authMiddleware = require('../utils/authMiddleware');

const AuthController = require('../controllers/auth.controller');

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.get('/user', authMiddleware, AuthController.getUser);
router.delete('logout', authMiddleware, AuthController.logout);

module.exports = router;