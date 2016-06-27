/**
 * Created by yasser.s on 06/27/2016.
 */
var TeamCreateModel = CommonCreateModel.extend({
    defaults: function() {
        return {
            name: null,
            type: 'team'
        };
    },
    validation: {
        name: [{
            required: true,
            msg: 'This is a required field.'
        },{
            minLength: '3',
            msg: 'Too short. Minimum 3 characters are required.'
        }]
    }
});

var TeamCreateView = CommonCreateView.extend({
    events: {
        'click button#createBtn': 'create'
    },
    fillModelWithValues: function(){
        this.model.set({
            name:$("#name").val()
        });
    }
});