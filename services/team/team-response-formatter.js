/**
 * Created by yasser.s on 06/26/2016.
 */
function TeamResponseFormatter(){}

TeamResponseFormatter.prototype = {
    getTeam: function(team){
        return {
            id: team.id,
            name: team.name,
            projectCount: 0,
            userCount: team.members.length,
        };
    }
}

module.exports = TeamResponseFormatter;

