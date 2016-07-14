var express = require('express');
var router = express.Router();
var staticFunctionsJs = require('../utils/staticFunctions');
var projectServiceJs = require('../services/project/project-service');
var issueServiceJs = require('../services/issue/issue-service');
var Underscore = require('underscore');
var teamServiceJs = require('../services/team/team-service');

var staticFunctions = new staticFunctionsJs();
var projectService = new projectServiceJs();
var teamService = new teamServiceJs();
var issueService = new issueServiceJs();

/*** START OF PROJECT ***/
router.get('/projects', staticFunctions.isAuthenticated, function (req, res) {
    console.log(req.user.id);
    teamService.getTeamByAccountId(req.user.id).bind({})
        .then(function(teams){
            return projectService.getProjectsGroupedByTeams(teams);
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

/*** START OF ISSUE ***/
router.post('/issue/create', staticFunctions.isAuthenticated, function (req, res) {
    issueService.create(req.body.name, req.user.id)
        .then(function(response){
            res.json(200, 'created');
        });
});
/*** END OF ISSUE ***/

module.exports = router;
