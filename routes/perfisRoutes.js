const express = require('express');
const router = express.Router();

const perfilController = require('../controllers/perfilController');

router.get('/meusperfis', perfilController.showMyProfiles);

module.exports = router;