var CommonIssueListingView = Backbone.View.extend({
    className: 'srow',
    events: {
        'click button#createissue': 'createIssue'
    },
    initialize: function(){
        this.startLoader();
        this.initModal();
        this.load();

        var self = this;
        App.Notifications.on('issue:create', function (opts) {
            self.load();
        }, this);
    },
    initModal: function(){
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
        console.log("load");
        var that = this;
        this.collection = new IssueCollection();
        this.collection.fetch({
            success: function (data) {
                that.render(data);
            }
        });
    }
});