const { Sequelize } = require('sequelize');
 
const db = new Sequelize('kittenbook', 'root', 'AntiumArt-00', {
    host: "localhost",
    dialect: "mysql"
});
 
module.exports = db;