const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;

router.post('/', (req, res, next) => {
    let username = req.body.username;
    let password = req.body.password;
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    console.log(lastName);

    res.send({status: 'SUCCESS'});
});

module.exports = router;