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
        return projectService.getIssueCount()
            .then(function(issueCount){
                var newIssue = new Issue({
                    projectId: issueDetail.projectId,
                    id: issueNumber,
                    title: issueDetail.title,
                    description: issueDetail.description,
                    sprint: issueDetail.sprintId,
                    category: issueDetail.categoryId,
                    assignedTo: issueDetail.assignedToId,
                    createdDate: new Date(),
                    createdBy: creatorAccountId,
                    updatedDate: null,
                    updatedBy: null
                });
                return null;
                return issueDataStore.create(newIssue);
            });
    }
};

module.exports = IssueService;
