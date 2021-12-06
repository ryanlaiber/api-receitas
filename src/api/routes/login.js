const express = require('express');
const LoginController = require('../controllers/login');

const router = express.Router();

router.post('/', LoginController.getLoginToken);

module.exports = router;
