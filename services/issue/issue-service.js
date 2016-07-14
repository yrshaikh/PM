/**
 * Created by yasser.s on 07/12/2016.
 */
var Issue = require('../../models/issue');
var issueDataStoreJs = require('../../datastore/issue-data-store');
var projectServiceJs = require('../../services/project/project-service');

var Underscore = require('underscore');
var projectService, issueDataStore;
function IssueService(){
    projectService = new projectServiceJs();
    issueDataStore = new issueDataStoreJs();
}

IssueService.prototype = {
    create: function(issueDetail, creatorAccountId){
        var issueNumber;
        return projectService.getIssueCount(issueDetail.projectId)
            .then(function(issueCount){
                var newIssue = new Issue({
                    projectId: issueDetail.projectId,
                    id: issueCount,
                    title: issueDetail.title,
                    description: issueDetail.description,
                    priority: issueDetail.priority,
                    sprint: issueDetail.sprint,
                    category: issueDetail.category,
                    assignedTo: issueDetail.assignedTo,
                    createdDate: new Date(),
                    createdBy: creatorAccountId,
                    updatedDate: null,
                    updatedBy: null
                });
                return issueDataStore.create(newIssue);
            });
    },
    get: function(projectId){
        return issueDataStore.get(projectId)
            .then(function(issues){
                console.log(issues);
                return issues;
            });
    }
};

module.exports = IssueService;
