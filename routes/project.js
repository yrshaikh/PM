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

module.exports = router;

