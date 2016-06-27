/**
 * Created by yasser.s on 06/27/2016.
 */
var Project = require('../../models/project');
var projectDataStoreJs = require('../../datastore/project-data-store');
var uuid = require('node-uuid');
var Underscore = require('underscore');

var projectDataStore = new projectDataStoreJs();

function ProjectService(){}

ProjectService.prototype = {
    getProjectsByAccountId: function (accountId) {
        throw NotImplementedException;
    },
    getProjectsByTeamId: function (teamId) {

    },
    getProjectsByTeamIdArray: function (teamIdArray) {
        return projectDataStore.getProjectsByTeamIdArray(teamIdArray)
            .then(function(response){
                return response;
            })
    },
    create: function(teamId, projectName, creatorAccountId){
        var newProject = new Project({
            teamId: teamId,
            id: uuid.v1(),
            name: projectName,
            createdDate: new Date(),
            createdBy: creatorAccountId
        });
        return projectDataStore.create(newProject);
    }
}

module.exports = ProjectService;
