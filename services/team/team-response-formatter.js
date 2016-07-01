/**
 * Created by yasser.s on 06/26/2016.
 */
function TeamResponseFormatter(){}

TeamResponseFormatter.prototype = {
    getTeam: function(team, projects){
        return {
            id: team.id,
            name: team.name,
            projectCount: team.projectCount,
            userCount: team.members.length,
        };
    }
}

module.exports = TeamResponseFormatter;

