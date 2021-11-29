var DataTypes = require("sequelize").DataTypes;
var _historial = require("./Historial");
var _horario = require("./Horario");
var _materias = require("./materias");
var _notas = require("./notas");
var _tareas = require("./tareas");
var _usuarios = require("./usuarios");

function initModels(sequelize) {
  var historial = _historial(sequelize, DataTypes);
  var horario = _horario(sequelize, DataTypes);
  var materias = _materias(sequelize, DataTypes);
  var notas = _notas(sequelize, DataTypes);
  var tareas = _tareas(sequelize, DataTypes);
  var usuarios = _usuarios(sequelize, DataTypes);

  tareas.belongsTo(horario, { as: "clave_materia_horario", foreignKey: "clave_materia"});
  horario.hasMany(tareas, { as: "tareas", foreignKey: "clave_materia"});
  historial.belongsTo(materias, { as: "clave_materia_materia", foreignKey: "clave_materia"});
  materias.hasMany(historial, { as: "historials", foreignKey: "clave_materia"});
  horario.belongsTo(materias, { as: "clave_materia_materia", foreignKey: "clave_materia"});
  materias.hasMany(horario, { as: "horarios", foreignKey: "clave_materia"});
  historial.belongsTo(usuarios, { as: "nombre_usuario_usuario", foreignKey: "nombre_usuario"});
  usuarios.hasMany(historial, { as: "historials", foreignKey: "nombre_usuario"});
  horario.belongsTo(usuarios, { as: "nombre_usuario_usuario", foreignKey: "nombre_usuario"});
  usuarios.hasMany(horario, { as: "horarios", foreignKey: "nombre_usuario"});
  notas.belongsTo(usuarios, { as: "nombre_usuario_usuario", foreignKey: "nombre_usuario"});
  usuarios.hasMany(notas, { as: "nota", foreignKey: "nombre_usuario"});
  tareas.belongsTo(usuarios, { as: "nombre_usuario_usuario", foreignKey: "nombre_usuario"});
  usuarios.hasMany(tareas, { as: "tareas", foreignKey: "nombre_usuario"});

  return {
    historial,
    horario,
    materias,
    notas,
    tareas,
    usuarios,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
