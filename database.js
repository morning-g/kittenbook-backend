const {Sequelize} = require('sequelize');
const {initModels} = require("./models/init-models");
const fs = require("fs");

let db;

if (process.env.NODE_ENV === "production") {
    db = new Sequelize('KITTENBOOK', 'kittenAdmin@servidor-base-de-datos-kittenbook', 'Kittenbook2021!', {
        host: 'servidor-base-de-datos-kittenbook.mysql.database.azure.com',
        port: 3306,
        dialect: 'mysql',
        pool: {
            max: 5,
            min: 0,
            idle: 10000
        },
        dialectOptions: {
            ssl: {
                ca: fs.readFileSync(__dirname + '/BaltimoreCyberTrustRoot.crt.pem')
            }
        }
    });
} else {
    db = new Sequelize('kittenbook', 'root', 'AntiumArt-00', {
        host: "localhost",
        dialect: "mysql"
    });
}

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

module.exports = {models, db};