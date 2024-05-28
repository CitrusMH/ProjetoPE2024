const express = require('express');
const router = express.Router();
const checkLogin = require('../middlewares/checkLogin'); // Fix: Change 'checklogin' to 'checkLogin'

const genericController = require('../controllers/genericController');

router.get('', checkLogin, genericController.home);

module.exports = router;
