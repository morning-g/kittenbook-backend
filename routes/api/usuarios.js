const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const modelos = require('../../database')

router.post('/registro', (req, res, next) => {
    const saltRounds = 10;
    bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
        // Store hash in your password DB.
        const usuario = {
            nombre_usuario: req.body.username,
            nombre: req.body.firstName,
            apellido: req.body.lastName,
            hash_password: hash
        };
        modelos.usuarios.create(usuario)
            .then(data => {
                console.log("Data sent:")
                console.log(data);
                res.send(data);
            })
            .catch(err => {
                console.log("Error:")
                console.log(err);
                res.status(500).send({
                    message:
                        err.message || "Error al registrarse."
                });
            });
    });
});

router.post('/login', (req, res, next) => {
    var session;
    modelos.usuarios.findOne({
        raw: true,
        attributes: ['hash_password'],
        where: {nombre_usuario: req.body.username}
    }).then(data => {
        console.log("Data sent:");
        console.log(data);
        bcrypt.compare(req.body.password, data.hash_password, function (err, result) {
            if (result) {
                session = req.session;
                session.userid = req.body.username;
                res.send({status: 'SUCCESS'});
            } else {
                res.send({status: 'FAILURE'});
            }
        });
    }).catch(err => {
        console.log("Error:");
        console.log(err);
        res.status(500).send({
            message: "Error al buscar al usuario."
        });
    });
});

router.get('/logout', (req, res) => {
    req.session.destroy();
});

module.exports = router;