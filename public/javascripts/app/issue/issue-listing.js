var IssueListingView = Backbone.View.extend({
    events: {
        'click button#createissue': 'createIssue'
    },
    initialize: function(){
    },
    createIssue: function(){
        var createView = new IssueCreateView({
            el: '#create-issue-view',
            model: new IssueCreateModel()
        });
        createView.show();
    }
});