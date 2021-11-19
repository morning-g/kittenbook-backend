const express = require('express');
const router = express.Router();
const database = require('../../database');

let auth = function (req, res, next) {
    if (req.session.authenticated)
        return next();
    else
        return res.sendStatus(401);
};

router.post('/', auth, (req, res, next) => {
    if (req.body.clave_materia === "" || req.body.estado === "") {
        return res.status(401).send({
            message: "No se llenaron los campos requeridos."
        });
    }
    const materia = {
        nombre_usuario: req.session.username,
        clave_materia: req.body.clave_materia,
        estado: req.body.estado,
        semestre_cursada: req.body.semestre_cursada,
        calificacion: req.body.calificacion,
        periodo_cursada: req.body.periodo_cursada
    }
    database.models.historial.create(materia).then(data => {
        res.status(200).send();
    }).catch(err => {
        console.log(err);
        res.status(400).send();
    });
});

router.get('/', auth, (req, res, next) => {
    database.models.historial.findAll({
        raw: true,
        attributes: ['id_curso', 'clave_materia', 'estado', 'semestre_cursada', 'calificacion', 'periodo_cursada'],
        where: {nombre_usuario: req.session.username}
    }).then(data => {
        if (data === null) {
            return res.status(401).send({
                message: "Materias no encontradas."
            });
        }
        res.status(200).json(data);
    }).catch(err => {
        console.log(err);
        res.status(400).send();
    });
});

router.delete('/', auth, (req, res, next) => {
    database.models.historial.destroy({
        where: {id_curso: req.body.id_curso}
    }).then(data => {
        if (data === null) {
            return res.status(401).send({
                message: "Curso no encontrado."
            });
        }
        res.status(200).send();
    }).catch(err => {
        console.log(err);
        res.status(400).send();
    });
});

module.exports = router;