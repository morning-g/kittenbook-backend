const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tareas', {
    id_tarea: {
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
      allowNull: false,
      references: {
        model: 'horario',
        key: 'clave_materia'
      }
    },
    tiempo_creacion: {
      type: DataTypes.DATE,
      allowNull: true
    },
    tiempo_inicio: {
      type: DataTypes.DATE,
      allowNull: true
    },
    tiempo_finalizacion: {
      type: DataTypes.DATE,
      allowNull: true
    },
    titulo: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    estado: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'tareas',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_tarea" },
        ]
      },
      {
        name: "nombre_usuario",
        using: "BTREE",
        fields: [
          { name: "nombre_usuario" },
        ]
      },
      {
        name: "clave_materia",
        using: "BTREE",
        fields: [
          { name: "clave_materia" },
        ]
      },
    ]
  });
};
