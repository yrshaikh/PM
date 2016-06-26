/**
 * Created by yasser.s on 06/25/2016.
 */

_.extend(Backbone.Validation.callbacks, {
    valid: function (view, attr, selector) {
        var $el = view.$('[name=' + attr + ']'),
            $group = $el.closest('.form-group');

        $group.removeClass('has-error');
        $group.find('.help-block').html('').addClass('hidden');
    },
    invalid: function (view, attr, error, selector) {
        var $el = view.$('[name=' + attr + ']'),
            $group = $el.closest('.form-group');

        $group.addClass('has-error');
        $group.find('.help-block').html(error).removeClass('hidden');
    }
});

var CreateTeamModel = Backbone.Model.extend({
    url: '/teams/create',
    defaults: function() {
        return {
            name: null
        };
    },
    validation: {
        name: [{
            required: true,
            msg: 'Team name is a required field.'
        },{
            minLength: '3',
            msg: 'Team name is too short.'
        }]
    }
});

var CreateTeamView = Backbone.View.extend({
    events: {
        'click button#createTeam': 'createTeam'
    },
    initialize: function(){
        Backbone.Validation.bind(this);
    },
    createTeam: function(e){
        e.preventDefault();

        this.model.set({
            name:$("#name").val()
        });

        if(this.model.isValid(true)){
            $("#createTeam").hide();
            $("#creatingTeam").show();

            this.model.save();

            console.log("model is valid");
        }
    }
});