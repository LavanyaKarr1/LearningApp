const express = require('express');
const { registerUser, loginuser, changePassword, refreshToken } = require('../Controllers/public-controller');
const authMiddleware = require('../Middlewares/auth-middleware');

const router = express.Router();

router.post('/register',registerUser);
router.post('/login',loginuser);
router.post('/changePassword',changePassword);
router.post("/refresh-token",refreshToken);
module.exports = router;