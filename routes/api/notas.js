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
    if (req.body.titulo === "" || req.body.contenido === "") {
        return res.status(401).send({
            message: "No se llenaron los campos requeridos.."
        });
    }
    const nota = {
        nombre_usuario: req.session.username,
        titulo: req.body.titulo,
        contenido: req.body.contenido
    }
    database.models.notas.create(nota).then(data => {
        console.log(data);
        res.status(200).send();
    }).catch(err => {
        console.log(err);
        res.status(400).send();
    });
});

router.get('/', auth, (req, res, next) => {
    database.models.notas.findAll({
        raw: true,
        attributes: ['id_nota', 'titulo', 'contenido'],
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
    database.models.notas.destroy({
        where: {id_nota: req.body.id_nota}
    }).then(data => {
        if (data === null) {
            return res.status(401).send({
                message: "Nota no encontrada."
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
    database.models.notas.update({titulo: req.body.titulo, contenido: req.body.contenido}, {
        where: {id_nota: req.body.id_nota}
    }).then(data => {
        if (data === null) {
            return res.status(401).send({
                message: "Nota no encontrada."
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