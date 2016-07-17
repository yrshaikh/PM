/**
 * Created by yasser.s on 07/12/2016.
 */
var Issue = require('../../models/issue');
var issueDataStoreJs = require('../../datastore/issue-data-store');
var projectServiceJs = require('../../services/project/project-service');
var issueResponseFormatterJs = require('../../services/issue/issue-response-formatter');
var Underscore = require('underscore');
var projectService, issueDataStore, issueResponseFormatter;
function IssueService(){
    projectService = new projectServiceJs();
    issueDataStore = new issueDataStoreJs();
    issueResponseFormatter = new issueResponseFormatterJs();
}

IssueService.prototype = {
    create: function(issueDetail, creatorAccountId){
        return projectService.getIssueCount(issueDetail.projectId).bind({})
            .then(function(issueNumber){
                this.issueNumber = issueNumber;
                return projectService.getAllIssueStates(issueDetail.projectId);
            })
            .then(function(states){
                var sortedStates = Underscore.sortBy(states, 'rank');
                var newIssue = new Issue({
                    projectId: issueDetail.projectId,
                    id: this.issueNumber,
                    title: issueDetail.title,
                    description: issueDetail.description,
                    priority: issueDetail.priority,
                    sprint: issueDetail.sprint,
                    category: issueDetail.category,
                    assignedTo: issueDetail.assignedTo,
                    createdDate: new Date(),
                    createdBy: creatorAccountId,
                    updatedDate: null,
                    updatedBy: null,
                    stateId: sortedStates[1].id
                });
                return issueDataStore.create(newIssue);
            });
    },
    get: function(projectId){
        return projectService.getAllIssueStates(projectId).bind({})
            .then(function(states){
                this.states = states;
                return issueDataStore.get(projectId)
            })
            .then(function(issues){
                return issueResponseFormatter.getIssuesWithStates(issues, this.states);
            });
    },
    getAgileBoard: function(projectId){
        return projectService.getAllIssueStates(projectId).bind({})
            .then(function(states){
                this.states = states;
                return issueDataStore.get(projectId)
            })
            .then(function(issues){
                return issueResponseFormatter.getStatesWithIssues(issues, this.states);
            });
    },
    move: function(issueId, stateId){
        return issueDataStore.move(issueId, stateId)
            .then(function(issues){
                return issueResponseFormatter.getIssuesWithStates(issues);
            });
    }
};

module.exports = IssueService;
