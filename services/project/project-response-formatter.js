/**
 * Created by yasser.s on 06/26/2016.
 */
var Underscore = require('underscore');
function ProjectResponseFormatter() {
}

ProjectResponseFormatter.prototype = {
    getProjectsGroupedByTeam: function (projects, team) {
        var projectsGroupedByTeam = Underscore.groupBy(projects, 'teamId');
        var response = [];
        for (var i = 0; i < team.length; i++) {
            response.push({
                teamId: team[i].id,
                teamName: team[i].name,
                projects: projectsGroupedByTeam[team[i].id]
            });
        }
        return response;
    },
    getProjects: function (projects) {
        var response = [];
        for (var i = 0; i < projects.length; i++) {
            response.push({
                id: projects[i].id,
                name: projects[i].name,
                createdDate: projects[i].createdDate,
                teamId: projects[i].teamId // required for grouping.
            });
        }
        return response;
    },
    getIssueStates: function (states) {
        var response = [];
        for (var i = 0; i < states.length; i++) {
            response.push({
                id: states[i].id,
                name: states[i].name,
                rank: states[i].rank
            });
        }
        return response;
    },
    getProjectBasicDetails: function(project){
        return {
            id: project.id,
            name: project.name
        }
    }
};

module.exports = ProjectResponseFormatter;

