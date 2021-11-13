const express = require('express');
const router = express.Router();
const database = require('../../database');

let auth = function (req, res, next) {
    if (req.session.authenticated)
        return next();
    else
        return res.sendStatus(401);
};

router.post('/', (req, res, next) => {

});

router.get('/', (req, res, next) => {

});

module.exports = router;