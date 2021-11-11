const { Sequelize } = require('sequelize');
const { initModels } = require("./models/init-models");

const db = new Sequelize('kittenbook', 'root', 'AntiumArt-00', {
    host: "localhost",
    dialect: "mysql"
});

let models = initModels(db);

db.sync({force: true})
    .then(() => {
        console.log(`Database & tables created!`)
    });

// Conexión al servidor de la base de datos
db.authenticate()
    .then(() => {
        console.log("Connection has been established successfully.");
    })
    .catch((err) => {
        console.error("Unable to connect to the database:", err);
    });

module.exports = models;