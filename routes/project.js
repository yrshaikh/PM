/**
 * Created by yasser.s on 06/27/2016.
 */
var express = require('express');
var router = express.Router();

var staticFunctionsJs = require('../utils/staticFunctions');
var teamServiceJs = require('../services/team/team-service');
var projectServiceJs = require('../services/project/project-service');

var staticFunctions = new staticFunctionsJs();
var teamService = new teamServiceJs();
var projectService = new projectServiceJs();

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
    projectService.getProject(req.params.id)
        .then(function(project){
            console.log(project);
            res.render('project/issues', {
                projectId: req.params.id,
                projectName: project.name,
                slug: req.params.slug,
                user : req.user,
                activePg: { projects: true},
                activeSubPg: { issues: true}
            });
        });
});

router.get('/:id/:slug/agile', staticFunctions.isAuthenticated, function (req, res) {
    projectService.getProject(req.params.id)
        .then(function(project){
            res.render('project/agile', {
                projectId: req.params.id,
                projectName: project.name,
                slug: req.params.slug,
                user : req.user,
                activePg: { projects: true},
                activeSubPg: { agile: true}
            });
        });
});

router.get('/:id/:slug/documents', staticFunctions.isAuthenticated, function (req, res) {
    res.render('project/documents', {
        projectId: req.params.id,
        slug: req.params.slug,
        user : req.user,
        activePg: { projects: true},
        activeSubPg: { documents: true}
    });
});

router.get('/:id/:slug/settings', staticFunctions.isAuthenticated, function (req, res) {
    res.render('project/settings', {
        projectId: req.params.id,
        slug: req.params.slug,
        user : req.user,
        activePg: { projects: true},
        activeSubPg: { settings: true}
    });
});


module.exports = router;

