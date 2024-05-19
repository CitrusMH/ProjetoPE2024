const express = require('express');
const router = express.Router();

const usuarioController = require('../controllers/usuarioController');

router.get('/login', usuarioController.mostrarLogin);
router.post('/login', usuarioController.login);

router.get('/novousuario', usuarioController.mostrarCadastro);
router.post('/novousuario', usuarioController.create);


module.exports = router;
