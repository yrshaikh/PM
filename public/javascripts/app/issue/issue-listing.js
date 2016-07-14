var IssueModel = Backbone.Model.extend({
    defaults: function () {
        return {
            title: null
        }
    }
});

var IssueCollection = Backbone.Collection.extend({
    model: IssueModel,
    url: function () {
        var qParams = 'pid=' + location.pathname.split('/')[2];
        return new ResourceManager().get('issue', qParams);
    }
});

var IssueListingView = Backbone.View.extend({
    className: 'srow',
    template : _.template($('#issue-list-template').html()),
    events: {
        'click button#createissue': 'createIssue'
    },
    initialize: function(){
        var that = this;
        this.initModal();
        this.collection = new IssueCollection();
        this.collection.fetch({
            success: function (data) {
                that.render(data);
            }
        });
    },
    render: function (data) {
        var that = this;
        //this.$el.html('');
        var issues = {"issues": this.collection.toJSON()};
        console.log(this.$el.find("#doing"));
        this.$el.find("#doing").html(this.template(issues));
        return this;
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