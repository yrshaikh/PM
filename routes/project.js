/**
 * Created by yasser.s on 06/27/2016.
 */
var express = require('express');
var router = express.Router();

var staticFunctionsJs = require('../utils/staticFunctions');
var teamServiceJs = require('../services/team/team-service');

var staticFunctions = new staticFunctionsJs();
var teamService = new teamServiceJs();

router.get('/create', staticFunctions.isAuthenticated, function (req, res) {
    teamService.getTeamByAccountId(req.user.id)
        .then(function(teams){
            if(teams.length == 0){
                res.redirect("teams/create")
            }
            else{
                res.render('project/project-create', {
                    user : req.user,
                    teams: teams,
                    activePg: { projects: true},
                    activeSubPg: { create: true}
                });
            }
        })
        .catch(function(){
            res.json(500, null);
        });
});

router.get('/:id/:slug/', staticFunctions.isAuthenticated, function (req, res) {
    res.render('project/issues', {
        user : req.user,
        activePg: { projects: true},
        activeSubPg: { issues: true}
    });
});

router.get('/:id/:slug/documents', staticFunctions.isAuthenticated, function (req, res) {
    res.render('project/documents', {
        user : req.user,
        activePg: { projects: true},
        activeSubPg: { documents: true}
    });
});

router.get('/:id/:slug/settings', staticFunctions.isAuthenticated, function (req, res) {
    res.render('project/settings', {
        user : req.user,
        activePg: { projects: true},
        activeSubPg: { settings: true}
    });
});


module.exports = router;

