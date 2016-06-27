/**
 * Created by yasser.s on 06/25/2016.
 */
var teamDataStoreJs = require('../../datastore/team-data-store');
var TeamResponseFormatter = require('../../services/team/team-response-formatter');
var Team = require('../../models/team');
var uuid = require('node-uuid');
var Underscore = require('underscore');

var teamDataStore = new teamDataStoreJs();

function TeamService(){
    this.teamResponseFormatter = new TeamResponseFormatter();
}

TeamService.prototype = {
    getTeamByAccountId: function(accountId){
        var that = this;
        return teamDataStore.getTeamByAccountId(accountId)
            .then(function(teams){
                var teamResponse = [];
                Underscore.forEach(teams, function(team){
                    teamResponse.push(that.teamResponseFormatter.getTeam(team));
                });
                return teamResponse;
            });
    },
    create: function(teamName, creatorAccountId){
        var newTeam = new Team({
            id: uuid.v1(),
            name: teamName,
            createdDate: new Date(),
            createdBy: creatorAccountId,
            members:[
                {
                    mapId: uuid.v1(),
                    accountId: creatorAccountId,
                    role: null
                }
            ]
        });
        return teamDataStore.create(newTeam);
    }
}

module.exports = TeamService;
