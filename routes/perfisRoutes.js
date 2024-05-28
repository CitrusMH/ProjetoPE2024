const express = require('express');
const router = express.Router();
const checkLogin = require('../middlewares/checkLogin');

const perfilController = require('../controllers/perfilController');

router.get('/meusperfis',checkLogin, perfilController.showMyProfiles);
router.post('/criar_perfil',checkLogin, perfilController.create);
router.post('/editar_perfil/:id',checkLogin, perfilController.update);
router.post('/deletar_perfil/:id',checkLogin, perfilController.delete);

module.exports = router;