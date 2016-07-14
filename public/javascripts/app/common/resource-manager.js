/**
 * Created by yasser.s on 06/30/2016.
 */
var baseUrl;
function ResourceManager(){
    baseUrl = '/api/';
}

ResourceManager.prototype = {
    create: function(entityType){
        return this.generator(entityType, 'create');
    },
    get: function(entityType, queryParam){
        queryParam = queryParam != null ? ('?' + queryParam) : '';
        return this.generator(entityType, 'get', queryParam);
    },
    generator: function (entityType, actionType, queryParam) {
        var url;
        switch (actionType){
            case 'create':{
                url = baseUrl + entityType + '/create';
                break
            }
            case 'get':{
                url = baseUrl + entityType + 's' + queryParam;
                break
            }
        }
        return url;
    }
};
