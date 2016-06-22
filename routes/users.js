var express = require('express');
var router = express.Router();
var accountServiceJs = require('../services/account/account-service');

// users/get : get all users
router.get('/', function(req, res, next) {
    new accountServiceJs().getAllUsers()
        .then(function(response){
            res.send(response);
        });
});

// users/get/id
router.get('/:id', function(req, res, next) {
    var id = req.params.id;
    new accountServiceJs().getUserById(id)
        .then(function(response){
            res.send(response);
        });
});

module.exports = router;
