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
    if (req.body.clave_materia === "") {
        return res.status(401).send({
            message: "No se llenaron los campos requeridos.."
        });
    }
    let horaDeInicio = req.body.hora_inicio.toString() + ":00:00";
    let horaDeTermino = req.body.hora_termino.toString() + ":00:00";
    const clase = {
        nombre_usuario: req.session.username,
        clave_materia: req.body.clave_materia,
        grupo: req.body.grupo,
        docente: req.body.docente,
        aula: req.body.aula,
        hora_inicio: horaDeInicio,
        hora_termino: horaDeTermino,
        lunes: req.body.lunes,
        martes: req.body.martes,
        miercoles: req.body.miercoles,
        jueves: req.body.jueves,
        viernes: req.body.viernes,
    }
    console.log(req.body.hora_termino);
    console.log(req.body.hora_termino);
    database.models.horario.create(clase).then(data => {
        console.log(data);
        res.status(200).send();
    }).catch(err => {
        console.log(err);
        res.status(400).send();
    });
});

router.get('/', auth, (req, res, next) => {
    database.models.horario.findAll({
        raw: true,
        attributes: ['id_clase', 'clave_materia', 'grupo', "docente", "aula", "hora_inicio", "hora_termino", "lunes", "martes", "miercoles", "jueves", "viernes"],
        where: {nombre_usuario: req.session.username}
    }).then(data => {
        if (data === null) {
            return res.status(401).send({
                message: "Notas no encontradas."
            });
        }
        console.log(data);
        res.status(200).json(data);
    }).catch(err => {
        console.log(err);
        res.status(400).send();
    });
});

router.delete('/', auth, (req, res, next) => {
    database.models.horario.destroy({
        where: {id_clase: req.body.id_clase}
    }).then(data => {
        if (data === null) {
            return res.status(401).send({
                message: "Clase no encontrada."
            });
        }
        console.log(data);
        res.status(200).send();
    }).catch(err => {
        console.log(err);
        res.status(400).send();
    });
});

router.post('/actualizar', auth, (req, res, next) => {
    database.models.horario.update({
        id_clase: req.body.id_clase,
        nombre_usuario: req.session.username,
        clave_materia: req.body.clave_materia,
        grupo: req.body.grupo,
        aula: req.body.aula,
        hora_inicio: req.body.hora_inicio,
        hora_termino: req.body.hora_termino,
        lunes: req.body.lunes,
        martes: req.body.martes,
        miercoles: req.body.miercoles,
        jueves: req.body.jueves,
        viernes: req.body.viernes,
    }, {
        where: {id_clase: req.body.id_clase}
    }).then(data => {
        if (data === null) {
            return res.status(401).send({
                message: "Clase no encontrada."
            });
        }
        console.log(data);
        res.status(200).send();
    }).catch(err => {
        console.log(err);
        res.status(400).send();
    });
});

module.exports = router;