const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('notas', {
    id_nota: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nombre_usuario: {
      type: DataTypes.STRING(255),
      allowNull: false,
      references: {
        model: 'usuarios',
        key: 'nombre_usuario'
      }
    },
    titulo: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    contenido: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'notas',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_nota" },
        ]
      },
      {
        name: "nombre_usuario",
        using: "BTREE",
        fields: [
          { name: "nombre_usuario" },
        ]
      },
    ]
  });
};
