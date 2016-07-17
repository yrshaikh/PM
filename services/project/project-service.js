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
            issueCount: 0,
            states: [
                { id: 1, name: 'open', rank: 1 },
                { id: 2, name: 'in progress', rank: 2 },
                { id: 3, name: 'done', rank: 3 },
                { id: 4, name: 'verified', rank: 4 },
                { id: 5, name: 'closed', rank: 5 },
            ]
        });
        return projectDataStore.create(newProject);
    },
    getIssueCount: function(projectId){
        var issueCount = 0;
        return projectDataStore.getProjectByProjectId(projectId)
            .then(function(project){
                console.log(project);
                if(project){
                    issueCount = project.issueCount != null ? project.issueCount : 0;
                }
                return issueCount;
            }).then(function(issueCount){
                ++issueCount;
                return projectDataStore.setIssueCount(projectId, issueCount);
            }).then(function () {
                return issueCount;
            });
    },
    getAllIssueStates: function(projectId){
        return projectDataStore.getProjectByProjectId(projectId)
            .then(function (project) {
                return projectResponseFormatter.getIssueStates(project.states);
            });
    }
};

module.exports = ProjectService;
