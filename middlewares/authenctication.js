var express = require('express')
var router = express.Router()


var jwt = require('jsonwebtoken')
const SECRET = 'senha'

    function verificaToken(req, res, next) {
        var token = req.headers.authorization;
        if (!token)
            return res.status(401).send({ message: 'No token provided.' });

        jwt.verify(token, SECRET, function (err, payload) {
            if (err)
                return res.status(403).send({ auth: false, message: 'Failed to authenticate token.' });
            req.userData = payload;
            next();
        });
    }
