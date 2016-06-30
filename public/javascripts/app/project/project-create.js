/**
 * Created by yasser.s on 06/27/2016.
 */
var ProjectCreateModel = CommonCreateModel.extend({
    defaults: function() {
        return {
            name: null,
            team: null,
            type: 'project'
        };
    },
    validation: {
        name: [{
            required: true,
            msg: 'This is a required field.'
        },{
            minLength: '3',
            msg: 'Too short. Minimum 3 characters are required.'
        }],
        team: {
            required:true,
            msg: 'Select a team under which this project is to be filed.'
        }
    }
});

var ProjectCreateView = CommonCreateView.extend({
    events: {
        'click button#createBtn': 'create',
        'change #team': 'teamChanged'
    },
    childInitialize: function(){
        this.model.set("team", $("#team").val());
    },
    teamChanged: function(){
        this.model.set("team", $("#team").val());
    },
    fillModelWithValues: function(){
        this.model.set({
            name:$("#name").val()
        });
    }
});