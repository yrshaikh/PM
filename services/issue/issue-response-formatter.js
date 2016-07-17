/**
 * Created by yasser.s on 07/15/2016.
 */
var Underscore = require('underscore');
function IssueResponseFormatter(){}

IssueResponseFormatter.prototype = {
    getIssuesWithStates: function(issues, states){
        var response = [];
        var stateNameHash = {};
        for(var i = 0; i < states.length; i++){
            stateNameHash[states[i].id] = states[i].name;
        }
        for(var i = 0; i < issues.length; i++){
            var issue = this.getIssue(issues[i]);
            issue.stateName = stateNameHash[issues[i].stateId]
            response.push(issue);
        }
        return response;
    },
    getIssue: function(issue){
        return {
            id: issue.id,
            title: issue.title,
            priority: issue.priority,
            stateId: issue.stateId
        };
    },
    getStatesWithIssues: function(issues, states){
        var response = [];
        for(var i = 0; i < states.length; i++){
            var stateWithIssues = {};
            stateWithIssues.id = states[i].id;
            stateWithIssues.name = states[i].name;

            var filteredIssues = Underscore.where(issues, {stateId: states[i].id});
            var filteredFormattedIssues = [];
            for(var j = 0; j < filteredIssues.length; j++){
                filteredFormattedIssues.push(this.getIssue(filteredIssues[j]));
            }
            stateWithIssues.issues = filteredFormattedIssues;
            response.push(stateWithIssues);
        }
        return response;
    }
};

module.exports = IssueResponseFormatter;

