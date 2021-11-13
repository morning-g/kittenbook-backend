const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const database = require('../../database');

router.post('/registro', (req, res, next) => {
    if (req.body.firstName === "" || req.body.lastName === "" || req.body.password == "" || req.body.username === "") {
        return res.status(402).send();
    }
    database.models.usuarios.findOne({
        raw: true,
        attributes: ['nombre_usuario'],
        where: {nombre_usuario: req.body.username}
    }).then(data => {
        if (data === null) {
            const saltRounds = 10;
            bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
                // Store hash in your password DB.
                const usuario = {
                    nombre_usuario: req.body.username,
                    nombre: req.body.firstName,
                    apellido: req.body.lastName,
                    hash_password: hash
                };
                database.models.usuarios.create(usuario)
                    .then(data => {
                        console.log(data);
                        res.status(200).send();
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(400).send({
                            message: "Error al procesar la solicitud."
                        });
                    });
            });
        } else {
            res.status(401).send({
                message: "El usuario ya existe."
            });
        }
    }).catch(err => {
        console.log(err);
        res.status(400).send({
            message: "Error al procesar la solicitud."
        });
    });

});

router.post('/login', (req, res, next) => {
    database.models.usuarios.findOne({
        raw: true,
        attributes: ['hash_password'],
        where: {nombre_usuario: req.body.username}
    }).then(data => {
        if (data === null) {
            return res.status(401).send({
                message: "Usuario no encontrado."
            });
        }
        bcrypt.compare(req.body.password, data.hash_password, function (err, result) {
            if (result) {
                req.session.username = req.body.username;
                req.session.authenticated = true;
                res.status(200).send();
            } else {
                res.status(402).send();
            }
        });
    }).catch(err => {
        console.log(err);
        res.status(400).send({
            message: "Error al procesar la solicitud."
        });
    });
});

router.get('/autenticado', (req, res) => {
    if (req.session.username === undefined || req.session.authenticated === undefined) {
        return res.json({});
    }
    if (req.session.username !== undefined && req.session.authenticated !== undefined) {
        if (req.session.authenticated == true) {
            return res.json({username: req.session.username, authenticated: req.session.authenticated.toString()});
        }
    }
    res.status(400).send({
        message: "Error al procesar la solicitud."
    });
});

router.get('/logout', (req, res) => {
    if (req.session.authenticated) {
        delete req.session.user;
        req.session.authenticated = false;
        req.session.destroy((err) => {
            console.log(err);
        });
        res.clearCookie('connect.sid', {path: '/'});
        res.redirect('/');
    } else {
        res.status(400).send();
    }
});

module.exports = router;