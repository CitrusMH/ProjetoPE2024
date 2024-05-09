const Sequelize = require('sequelize');
const connection = require('../database/database');

const jogos = require('./Jogos');

const Conquistas = connection.define('conquista', {
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    descricao: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    concluido: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
});

Conquistas.belongsTo(jogos);

//Conquistas.sync({force: true});

module.exports = Conquistas;