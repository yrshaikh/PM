/**
 * Created by yasser.s on 06/27/2016.
 */
/**
 * Created by yasser.s on 06/25/2016.
 */
var Promise = require('bluebird');
var Project = require('../models/project');

function ProjectDataStore(){}

Promise.promisifyAll(Project);
Promise.promisifyAll(Project.prototype);

ProjectDataStore.prototype = {
    getProjectsByTeamIdArray: function(teamIdArray){
        return Project.findAsync({teamId: { '$in': teamIdArray }});
    },
    create: function(newProject){
        return newProject.saveAsync();
    }
};

module.exports = ProjectDataStore;

