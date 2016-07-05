/**
 * Created by yasser.s on 06/30/2016.
 */

var TeamModel = Backbone.Model.extend({
    defaults: function () {
        return {
            teamId: null,
            teamName: null,
            projects: null
        }
    }
});

var TeamCollection = Backbone.Collection.extend({
    model: TeamModel,
    url: function () {
        return new ResourceManager().get('project');
    }
});

var TeamListView = Backbone.View.extend({
    className: 'srow',
    template : _.template($('#project-list-template').html()),
    initialize: function () {
        var that = this;
        this.collection = new TeamCollection();
        this.collection.fetch({
            success: function (data) {
                that.render(data);
            }
        });
    },
    render: function (data) {
        var that = this;
        this.$el.html('');
        var teams = {"teams": this.collection.toJSON()};
        this.$el.html(this.template(teams));
        return this;
    }
});