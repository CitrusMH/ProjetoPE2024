const Sequelize = require('sequelize');
const connection = require('../database/database');

const usuario = require('./Usuarios');

const Perfis = connection.define('perfis', {
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    plataforma: {
        type: Sequelize.STRING,
        allowNull: false
    },
});

Perfis.belongsTo(usuario);

//Perfis.sync({force: true});

module.exports = Perfis;