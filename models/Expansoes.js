const Sequelize = require('sequelize');
const connection = require('../database/database');

const jogos = require('./Jogos');

const Expasoes = connection.define('expansoes', {
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

Expasoes.belongsTo(jogos);

//Expasoes.sync({force: true});

module.exports = Expasoes;