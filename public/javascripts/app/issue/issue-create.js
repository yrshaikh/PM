/**
 * Created by yasser.s on 07/11/2016.
 */
var IssueCreateModel = CommonCreateModel.extend({
    defaults: function() {
        return {
            type: 'issue',
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

var IssueCreateView = CommonCreateView.extend({
    events: {
        'click button#createBtn': 'create',
        'click .overlay-close': 'hide',
        'click .dropdown-menu li a': 'dropdownItemChanged'
    },
    fillModelWithValues: function(){
        this.model.set({
            projectId: location.pathname.split('/')[2],
            title: $("#title").val(),
            description: $("#description").val(),
            priority: this.$("#priorityDd").data("model"),
            assignee: null,
            sprint:null,
            category: null
        });
    },
    childInitialize: function(){
        this.$("#createBtn").show();
        this.$("#creatingBtn").hide();
        $("#title").val('');
        $("#description").val('');
        $("#title").focus();
        this.initDropDowns();
        this.initCreateModal();
    },
    initCreateModal: function(){
        console.log($("#create-issue-view"));
        $("#create-issue-view").modal('show');
        $("#create-issue-view").on('hidden.bs.modal', function () {
            $(this).data('bs.modal', null);
        });
    },
    saveCreateSuccessCallback: function(){
        this.$("button.close").click();
        App.Notifications.trigger("issue:create");
    },
    initDropDowns: function(){
        this.initPriorityDropDown();
        this.initAssigneeDropDown();
    },
    initPriorityDropDown: function(){
        var priorities = ['critical', 'high', 'normal', 'low', 'trivial'];
        var defaultValue = priorities[2];
        this.$("#priorityDd").text(defaultValue);
        this.$("#priorityDd").data("model", defaultValue);
        _.each(priorities, function(value){
            var html = "<li><a href='#'>" + value + "</a></li>";
            this.$(".priorityDdUl").append(html);
        });
    },
    initAssigneeDropDown: function(){
    },
    dropdownItemChanged: function(event){
        var modifiedValue = $(event.target).text();
        var type = $(event.target).closest('.dropdown-menu').data("type");
        if(type === 'priority'){
            this.$("#priorityDd").text(modifiedValue);
            this.$("#priorityDd").data("model", modifiedValue);
        }
    }
});