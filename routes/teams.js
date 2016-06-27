/**
 * Created by yasser.s on 06/25/2016.
 */
var express = require('express');
var router = express.Router();

var staticFunctionsJs = require('../utils/staticFunctions');
var teamServiceJs = require('../services/team/team-service');

var staticFunctions = new staticFunctionsJs();
var teamService = new teamServiceJs();

router.get('/create', staticFunctions.isAuthenticated, function (req, res) {
    res.render('team/team-create', {
        user : req.user,
        showWelcomeMessage: req.query["noteam"] == 1,
        activePg: { teams: true},
        activeSubPg: { create: true}
    });
});

router.get('/', staticFunctions.isAuthenticated, function (req, res) {
    res.render('team/team-list', {
        user : req.user,
        showCreatedMessage: req.query["created"] == 1,
        activePg: { teams: true},
        activeSubPg: { teams: true}
    });
});

router.get('/list', staticFunctions.isAuthenticated, function (req, res) {
    teamService.getTeamByAccountId(req.user.id)
        .then(function(response){
            res.json(200, response);
        })
        .catch(function(){
            res.json(500, null);
        });
});

router.post('/create', staticFunctions.isAuthenticated, function (req, res) {
    teamService.create(req.body.name, req.user.id)
        .then(function(response){
            res.json(200, 'ok');
        });
});

module.exports = router;