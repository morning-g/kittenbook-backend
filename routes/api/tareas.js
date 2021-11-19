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
    if (req.body.titulo === "" || req.body.descripcion === "" || req.body.clave_materia === "") {
        return res.status(401).send({
            message: "No se llenaron los campos requeridos.."
        });
    }
    const tarea = {
        nombre_usuario: req.session.username,
        clave_materia: req.body.clave_materia,
        tiempo_creacion: new Date().toLocaleString(),
        tiempo_inicio: "",
        tiempo_finalizacion: "",
        titulo: req.body.titulo,
        descripcion: req.body.descripcion,
        estado: req.body.estado
    };
    database.models.tareas.create(tarea).then(data => {
        console.log(data);
        res.status(200).send();
    }).catch(err => {
        console.log(err);
        res.status(400).send();
    });
});

router.get('/', auth, (req, res, next) => {
    database.models.tareas.findAll({
        raw: true,
        attributes: ['id_tarea', 'clave_materia', 'tiempo_creacion', 'tiempo_inicio', 'tiempo_finalizacion', 'titulo', 'descripcion', 'estado'],
        where: {nombre_usuario: req.session.username}
    }).then(data => {
        if (data === null) {
            return res.status(401).send({
                message: "Tareas no encontradas."
            });
        }
        res.status(200).json(data);
    }).catch(err => {
        console.log(err);
        res.status(400).send();
    });
});

router.post('/actualizar', auth, (req, res, next) => {
    database.models.tareas.update({
        titulo: req.body.titulo,
        descripcion: req.body.descripcion
    }, {
        where: {id_tarea: req.body.id_tarea}
    }).then(data => {
        if (data === null) {
            return res.status(401).send({
                message: "Tarea no encontrada."
            });
        }
        res.status(200).send();
    }).catch(err => {
        console.log(err);
        res.status(400).send();
    });
});

router.delete('/', auth, (req, res, next) => {
    database.models.tareas.destroy({
        where: {id_tarea: req.body.id_tarea}
    }).then(data => {
        if (data === null) {
            return res.status(401).send({
                message: "Tarea no encontrada."
            });
        }
        res.status(200).send();
    }).catch(err => {
        console.log(err);
        res.status(400).send();
    });
});

router.post('/empezar', auth, (req, res, next) => {
    database.models.tareas.update({
        tiempo_inicio: new Date().toLocaleString(),
        estado: "Iniciada"
    }, {
        where: {id_tarea: req.body.id_tarea}
    }).then(data => {
        if (data === null) {
            return res.status(401).send({
                message: "Tarea no encontrada."
            });
        }
        res.status(200).send();
    }).catch(err => {
        console.log(err);
        res.status(400).send();
    });
});

router.post('/finalizar', auth, (req, res, next) => {
    database.models.tareas.update({
        tiempo_finalizacion: new Date().toLocaleString(),
        estado: "Finalizada"
    }, {
        where: {id_tarea: req.body.id_tarea}
    }).then(data => {
        if (data === null) {
            return res.status(401).send({
                message: "Tarea no encontrada."
            });
        }
        res.status(200).send();
    }).catch(err => {
        console.log(err);
        res.status(400).send();
    });
});

module.exports = router;