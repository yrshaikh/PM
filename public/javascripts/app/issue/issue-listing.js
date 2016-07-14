var IssueListingView = Backbone.View.extend({
    events: {
        'click button#createissue': 'createIssue'
    },
    initialize: function(){
        this.initModal();
    },
    initModal: function(){
        $('#create-issue-view').on('shown.bs.modal', function () {
            var createView = new IssueCreateView({
                el: '#create-issue-view',
                model: new IssueCreateModel()
            });;
        });
    }
});