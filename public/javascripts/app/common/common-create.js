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
        return new ResourceManager().create(this.attributes.type);
    },
    defaults: function() {
        return {
            name: null,
            type: null
        };
    }
});

var CommonCreateView = Backbone.View.extend({
    initialize: function(){
        Backbone.Validation.bind(this);
        this.childInitialize();
    },
    childInitialize: function(){
    },
    create: function(e){
        e.preventDefault();

        this.$("#creatingError").hide();

        this.fillModelWithValues();

        if(this.model.isValid(true)){
            this.$("#createBtn").hide();
            this.$("#creatingBtn").show();

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
            location.href = '/dashboard';
        }
    },
    saveCreateErrorCallback: function(model, response){
        console.log("error", model, response);
        this.$("#createBtn").show();
        this.$("#creatingBtn").hide();
        this.$("#creatingError").show();
    }
});