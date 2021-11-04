const { Sequelize, DataTypes } = require("sequelize");

const Usuario = sequelize.define(
  "usuarios",
  {
    // Model attributes are defined here
    nombre: {
      type: DataTypes.STRING
    },
    apelllido: {
      type: DataTypes.STRING,
    },
    correo_electronico: {
      type: DataTypes.STRING,
    },
    hash_password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    // Other model options go here
  }
);

module.exports = Usuario;
