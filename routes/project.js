/**
 * Created by yasser.s on 06/27/2016.
 */
var express = require('express');
var router = express.Router();

var staticFunctionsJs = require('../utils/staticFunctions');
var projectServiceJs = require('../services/project/project-service');
var Underscore = require('underscore');

var teamServiceJs = require('../services/team/team-service');
var staticFunctions = new staticFunctionsJs();
var projectService = new projectServiceJs();

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

router.post('/create', staticFunctions.isAuthenticated, function (req, res) {
    projectService.create(req.body.team, req.body.name, req.user.id)
        .then(function(response){
            res.json(200, 'ok');
        });
});

router.get('/list', staticFunctions.isAuthenticated, function (req, res) {
    teamService.getTeamByAccountId(req.user.id)
        .then(function(teams){
            return Underscore.pluck(teams, 'id');
        })
        .then(function(teamIds){
            return projectService.getProjectsByTeamIdArray(teamIds);
        })
        .then(function(projects){
            res.json(200, projects);
        })
        .catch(function(){
            res.json(500, null);
        });
});

module.exports = router;

