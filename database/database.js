const sequelize = require('sequelize');

const connection = new sequelize(
    'jogos', 
    'root',
    'Gangplank@2',
    {
        host: 'localhost',
        dialect: 'mysql',
        timezone: '-03:00'
    }
);

module.exports = connection;
