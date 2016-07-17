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
    var issueDetails = {
        projectId: req.body.projectId,
        title: req.body.title,
        description: req.body.description,
        priority: req.body.priority,
        sprint: req.body.sprint,
        category: req.body.category,
        assignedTo: req.body.assignee
    };
    issueService.create(issueDetails, req.user.id)
        .then(function(response){
            res.json(200, 'created');
        });
});

router.get('/issues', staticFunctions.isAuthenticated, function (req, res) {
    var projectId = req.query.pid;
    issueService.get(projectId).bind({})
        .then(function(issues){
            res.json(200, issues);
        })
        .catch(function(){
            res.json(500, null);
        });
});

router.get('/agiles', staticFunctions.isAuthenticated, function (req, res) {
    var projectId = req.query.pid;
    issueService.getAgileBoard(projectId).bind({})
        .then(function(issues){
            res.json(200, issues);
        })
        .catch(function(){
            res.json(500, null);
        });
});
/*** END OF ISSUE ***/

/** START OF ISSUE OPERATIONS **/
router.get('/issue/move', staticFunctions.isAuthenticated, function (req, res) {
    issueService.move(req.body.id, req.body.stateId).bind({})
        .then(function(response){
            res.json(200, 'moved');
        });
});
/** END OF ISSUE OPERATIONS **/

module.exports = router;
