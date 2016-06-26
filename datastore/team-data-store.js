/**
 * Created by yasser.s on 06/25/2016.
 */
var Promise = require('bluebird');
var Team = require('../models/team');

function TeamDataStore(){}

Promise.promisifyAll(Team);
Promise.promisifyAll(Team.prototype);

TeamDataStore.prototype = {
    getAllTeams: function(){
        return Team.findAsync()
    },
    getTeamByAccountId: function(accountId){
        return Team.findAsync({ 'members.accountId': accountId});
    },
    create: function(newTeam){
        return newTeam.saveAsync();
    }
};

module.exports = TeamDataStore;
