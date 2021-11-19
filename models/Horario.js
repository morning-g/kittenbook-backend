const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('horario', {
    id_clase: {
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
    clave_materia: {
      type: DataTypes.CHAR(8),
      allowNull: true,
      references: {
        model: 'materias',
        key: 'clave_materia'
      }
    },
    grupo: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    docente: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    aula: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    hora_inicio: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    hora_termino: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    lunes: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    martes: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    miercoles: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    jueves: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    viernes: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'horario',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_clase" },
        ]
      },
      {
        name: "clave_materia",
        using: "BTREE",
        fields: [
          { name: "clave_materia" },
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
