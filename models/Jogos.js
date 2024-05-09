const sequelize = require('sequelize');
const connection = require('../database/database');

const perfis = require('./Perfis');

const Jogos = connection.define('jogo', {
    nome: {
        type: sequelize.STRING,
        allowNull: false
    },
    platinado: {
        type: sequelize.BOOLEAN,
        allowNull: false
    }
})

Jogos.belongsTo(perfis);

//Jogos.sync({force: true});

module.exports = Jogos;