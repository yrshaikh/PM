/**
 * Created by yasser.s on 06/30/2016.
 */
var TeamModel = Backbone.Model.extend({
    defaults: function () {
        return {
            id: null,
            name: null,
            projectCount: null,
            userCount: null
        }
    }
});

var TeamCollection = Backbone.Collection.extend({
    model: TeamModel,
    url: function () {
        return new ResourceManager().get('team');
    }
});

var TeamListView = Backbone.View.extend({
    className: 'srow',
    template : _.template($('#team-list-template').html()),
    events: {
        'mouseout .item': 'mouseOut',
        'mouseover .item': 'mouseIn'
    },
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
    },
    mouseOut:function(event){
        $(event.target).closest(".team-card").find(".icon").addClass("dnone");
    },
    mouseIn:function(event){
        $(event.target).closest(".team-card").find(".icon").removeClass("dnone");
    }
});