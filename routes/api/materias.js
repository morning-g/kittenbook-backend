const express = require('express');
const router = express.Router();
const database = require('../../database');

let auth = function (req, res, next) {
    if (req.session.authenticated)
        return next();
    else
        return res.sendStatus(401);
};

router.get('/', auth, (req, res, next) => {
    database.models.materias.findAll({
        raw: true,
        attributes: ['clave_materia', 'nombre_materia', 'es_materia_especializada', 'especialidad', 'creditos_materia', "carrera_materia"]
    }).then(data => {
        if (data === null) {
            return res.status(401).send({
                message: "Materias no encontradas."
            });
        }
        console.log(data);
        res.status(200).json(data);
    }).catch(err => {
        console.log(err);
        res.status(400).send();
    });
});

module.exports = router;