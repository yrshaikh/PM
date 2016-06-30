/**
 * Created by yasser.s on 06/30/2016.
 */
var baseUrl;
function ResourceManager(){
    baseUrl = '/api/';
}

ResourceManager.prototype = {
    create: function(entityType){
        switch (entityType){
            case 'project': {
                return this.project('create');
            }
            case 'team': {
                return this.team('create');
            }
            default: throw error('invalid entityType passed to resource mgr.');
        }
    },
    get: function(entityType, queryParam){
        queryParam = queryParam != null ? ('?' + queryParam) : '';
        switch (entityType){
            case 'project': {
                return this.project('get', queryParam);
            }
            case 'team': {
                return this.team('get', queryParam);
            }
            default: throw error('invalid entityType passed to resource mgr.');
        }
    },
    project: function (actionType, queryParam) {
        var url;
        switch (actionType){
            case 'create':{
                url = baseUrl + 'project/create';
                break
            }
            case 'get':{
                url = baseUrl + 'projects' + queryParam;
                break
            }
        }
        return url;
    },
    team: function (actionType, queryParam) {
        var url;
        switch (actionType){
            case 'create':{
                url = baseUrl + 'team/create';
                break
            }
            case 'get':{
                url = baseUrl + 'teams' + queryParam;
                break
            }
        }
        return url;
    }
};
