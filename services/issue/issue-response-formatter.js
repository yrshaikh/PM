/**
 * Created by yasser.s on 07/15/2016.
 */
function IssueResponseFormatter(){}

IssueResponseFormatter.prototype = {
    getIssues: function(issues){
        var response = [];
        for(var i = 0; i < issues.length; i++){
            response.push({
                id: issues[i].id,
                title: issues[i].title,
                priority: issues[i].priority,
            });
        }
        return response;
    }
};

module.exports = IssueResponseFormatter;

