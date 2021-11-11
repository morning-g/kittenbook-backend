const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const modelos = require('../../database')

router.post('/', (req, res, next) => {
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
                        err.message || "Some error occurred while creating the Tutorial."
                });
            });
    });
});

router.get('/', (req, res, next) => {

});

module.exports = router;