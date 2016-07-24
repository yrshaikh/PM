/**
 * Created by yasser.s on 07/23/2016.
 */
var IssueModel = CommonCreateModel.extend({
    defaults: function() {
        return {
            id: null,
            title: null,
            description: null,
            priority: null,
            assignee: null,
            sprint:null,
            category: null
        };
    },
    validation: {
        title: [{
            required: true,
            msg: 'This is a required field.'
        },{
            minLength: '10',
            msg: 'Too short. Minimum 10 characters are required.'
        }]
    }
});

var IssueView = Backbone.View.extend({
    template : _.template($('#single-issue-view-template').html()),
    events: {
        'keypress .contenteditable' : 'contentEditableKeyPress'
    },
    initialize: function(){
        this.showModal();
        this.render();
    },
    render: function (data) {
        var that = this;
        var jsonData = this.model.toJSON();
        this.$el.html(this.template(jsonData));
        return this;
    },
    showModal: function(){
        $("#single-issue-view").modal('show');
        $("#single-issue-view").on('hidden.bs.modal', function () {
            $(this).data('bs.modal', null);
        });
        this.model.set('temp', true);
    },
    hideModal: function(){
        this.$("#single-issue-view").modal('hide');
    },
    contentEditableKeyPress: function(e){
        console.log('contentEditableKeyPress');
        return e.which != 13;
    }
});