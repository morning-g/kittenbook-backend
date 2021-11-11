const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('materias', {
    clave_materia: {
      type: DataTypes.CHAR(8),
      allowNull: false,
      primaryKey: true
    },
    nombre_materia: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    es_materia_especializada: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    especialidad: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    creditos_materia: {
      type: DataTypes.TINYINT,
      allowNull: true
    },
    carrera_materia: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'materias',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "clave_materia" },
        ]
      },
    ]
  });
};
