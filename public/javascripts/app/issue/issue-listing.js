var IssueModel = Backbone.Model.extend({
    defaults: function () {
        return {
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

var IssueListingView = CommonIssueListingView.extend({
    template : _.template($('#issue-list-template').html()),
    render: function (data) {
        var that = this;
        this.$el.html('');
        var jsonData = {"issues": this.collection.toJSON()};
        this.$el.html(this.template(jsonData));
        this.stopLoader();
        return this;
    }
});