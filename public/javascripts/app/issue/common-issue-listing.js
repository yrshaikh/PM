var CommonIssueListingView = Backbone.View.extend({
    className: 'srow',
    events: {
        'click #createissue': 'createIssue',
        'click .sissue': 'openIssue'
    },
    initialize: function(){
        this.startLoader();
        this.load();

        var self = this;
        App.Notifications.on('issue:create', function (opts) {
            self.load();
        }, this);
    },
    createIssue: function(){
        console.log('createIssue');
        var createView = new IssueCreateView({
            el: '#create-issue-view',
            model: new IssueCreateModel()
        });
    },
    startLoader: function(){
        $('.loading').show();
    },
    stopLoader: function(){
        $('.loading').hide();
    },
    load:function(){
        var that = this;
        this.collection = new IssueCollection();
        this.collection.fetch({
            success: function (data) {
                that.render(data);
            }
        });
    },
    openIssue: function(event){
        var id = $(event.target.closest('.sissue')).data('id');
        var title = $(event.target.closest('.sissue')).data('title');
        var view = new IssueView({ el:'#singleissue', model : new IssueModel({id: id, title: title})});
    }
});