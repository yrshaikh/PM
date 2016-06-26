/**
 * Created by yasser.s on 06/19/2016.
 */
var express = require('express');
var router = express.Router();
var staticFunctionsJs = require('../utils/staticFunctions');
var staticFunctions = new staticFunctionsJs();
var teamServiceJs = require('../services/team/team-service');
var teamService = new teamServiceJs();

router.get('/', staticFunctions.isAuthenticated, function (req, res) {
    teamService.getTeamByAccountId(req.user.id)
        .then(function(teams){
            if(teams.length == 0)
            {
                res.redirect('/teams/create?noteam=1')
            }
            else{
                res.render('dashboard', {
                    user : req.user,
                    selectedProject: null,
                    activePg: { projects: true},
                    activeSubPg: { projects: true}
                });
            }
        });
});

module.exports = router;
