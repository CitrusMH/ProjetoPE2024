const express = require('express');
const router = express.Router();
const checkLogin = require('../middlewares/checkLogin');

const jogosController = require('../controllers/jogosController');

router.get('/meusjogos',checkLogin, jogosController.showMyGames);
router.post('/criar_jogos',checkLogin, jogosController.create);

module.exports = router;