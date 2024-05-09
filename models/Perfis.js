const Sequelize = require('sequelize');
const connection = require('../database/database');

const usuario = require('./Usuarios');

const Perfil = connection.define('Perfil', {
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    plataforma: {
        type: Sequelize.STRING,
        allowNull: false
    },
    jogos: {
        type: Sequelize.STRING,
        allowNull: false
    },
});

Perfil.belongsTo(usuario);

//Perfil.sync({force: true});

module.exports = Perfil;