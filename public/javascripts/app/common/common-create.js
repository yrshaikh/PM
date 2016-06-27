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

var CommonCreateModel = Backbone.Model.extend({
    url: function(){
        var url = "";
        var entityType = this.attributes.type;
        switch (entityType){
            case 'team': {
                url = '/teams/create';
                break;
            }
            case 'project': {
                url = '/projects/create';
                break;
            }
        }
        return url;
    },
    defaults: function() {
        return {
            name: null,
            type: null
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

var CommonCreateView = Backbone.View.extend({
    initialize: function(){
        Backbone.Validation.bind(this);
    },
    create: function(e){
        e.preventDefault();

        $("#creatingError").hide();

        this.fillModelWithValues();

        if(this.model.isValid(true)){
            $("#createBtn").hide();
            $("#creatingBtn").show();

            this.model.save(null,  {success :this.saveCreateSuccessCallback, error: this.saveCreateErrorCallback});
        }
    },
    fillModelWithValues: function(){
        throw new Error('fillModelWithValues() should be overridden in the child view.')
    },
    saveCreateSuccessCallback: function(model, response){
        var type = model.attributes.type;
        if(type == 'team'){
            location.href = '/teams?created=1';
        }else if(type == 'project'){
            location.href = '/project';
        }
    },
    saveCreateErrorCallback: function(model, response){
        console.log("error", model, response);
        $("#createBtn").show();
        $("#creatingBtn").hide();
        $("#creatingError").show();
    }
});