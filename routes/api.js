var express = require('express');
var router = express.Router();
var staticFunctionsJs = require('../utils/staticFunctions');
var projectServiceJs = require('../services/project/project-service');
var Underscore = require('underscore');
var teamServiceJs = require('../services/team/team-service');

var staticFunctions = new staticFunctionsJs();
var projectService = new projectServiceJs();
var teamService = new teamServiceJs();

/*** START OF PROJECT ***/
router.get('/projects', staticFunctions.isAuthenticated, function (req, res) {
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
router.post('/project/create', staticFunctions.isAuthenticated, function (req, res) {
    projectService.create(req.body.team, req.body.name, req.user.id)
        .then(function(response){
            res.json(200, 'created');
        });
});
/*** END OF PROJECT ***/

/*** START OF TEAM ***/
router.get('/teams', staticFunctions.isAuthenticated, function (req, res) {
    teamService.getTeamByAccountId(req.user.id)
        .then(function(response){
            res.json(200, response);
        })
        .catch(function(){
            res.json(500, null);
        });
});
router.post('/team/create', staticFunctions.isAuthenticated, function (req, res) {
    teamService.create(req.body.name, req.user.id)
        .then(function(response){
            res.json(200, 'created');
        });
});
/*** END OF TEAM ***/

module.exports = router;
