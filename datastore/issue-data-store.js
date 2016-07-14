/**
 * Created by yasser.s on 07/12/2016.
 */
var Promise = require('bluebird');
var Issue = require('../models/issue');

function IssueDataStore(){}

Promise.promisifyAll(Issue);
Promise.promisifyAll(Issue.prototype);

IssueDataStore.prototype = {
    create: function(newIssue){
        return newIssue.saveAsync();
    },
    get: function(projectId){
        return Issue.findAsync({ 'projectId' : projectId })
    }
};

module.exports = IssueDataStore;

