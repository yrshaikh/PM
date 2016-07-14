/**
 * Created by yasser.s on 06/27/2016.
 */
var Project = require('../../models/project');
var projectDataStoreJs = require('../../datastore/project-data-store');
var projectResponseFormatterJs = require('../../services/project/project-response-formatter');
var uuid = require('node-uuid');
var Underscore = require('underscore');

var projectDataStore = new projectDataStoreJs();
var projectResponseFormatter = new projectResponseFormatterJs();

function ProjectService(){}

ProjectService.prototype = {
    getProjectsByTeams: function (teams) {
        var teamIdArray = Underscore.pluck(teams, 'id');
        return projectDataStore.getProjectsByTeamIdArray(teamIdArray)
            .then(function(projects){
                return projectResponseFormatter.getProjects(projects);
            });
    },
    getProjectsGroupedByTeams: function (teams) {
        return this.getProjectsByTeams(teams)
            .then(function(projects){
                return projectResponseFormatter.getProjectsGroupedByTeam(projects, teams);
            })
    },
    create: function(teamId, projectName, creatorAccountId){
        var newProject = new Project({
            teamId: teamId,
            id: uuid.v1(),
            name: projectName,
            createdDate: new Date(),
            createdBy: creatorAccountId,
            issueCount: 0
        });
        return projectDataStore.create(newProject);
    },
    getIssueCount: function(projectId){
        var issueCount = 0;
        return projectDataStore.getProjectByProjectId(projectId)
            .then(function(projects){
                if(projects){
                    issueCount = projects[0].issueCount ? projects[0].issueCount : 0;
                }
                return issueCount;
            }).then(function(issueCount){
                ++issueCount;
                return projectDataStore.setIssueCount(projectId, issueCount);
            }).then(function () {
                return issueCount;
            });
    },
    incrementIssueCount: function(projectId){

    }
};

module.exports = ProjectService;
