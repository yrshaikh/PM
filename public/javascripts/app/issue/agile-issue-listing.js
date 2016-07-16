var IssueModel = Backbone.Model.extend({
    defaults: function () {
        return {
            states: null,
            issues: null
        }
    }
});

var IssueCollection = Backbone.Collection.extend({
    model: IssueModel,
    url: function () {
        var qParams = 'pid=' + location.pathname.split('/')[2];
        return new ResourceManager().get('agile', qParams);
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
        var collection = this.collection.toJSON()[0];
        var jsonData = {"issues": collection.issues, "states": collection.states};
        //this.$el.find("#doing").html(this.template(jsonData));
        this.$el.html(this.template(jsonData));
        this.initBoard();
        return this;
    },
    initModal: function(){
        $('#create-issue-view').on('shown.bs.modal', function () {
            var createView = new IssueCreateView({
                el: '#create-issue-view',
                model: new IssueCreateModel()
            });;
        });
    },
    boardReload: function(){
        this.initialize();
        this.initBoard();
    },
    initBoard: function(){
        var that = this;
        $(".column").sortable({
            connectWith: ".column",
            handle: ".portlet-content",
            cancel: ".portlet-toggle",
            start: function (event, ui) {
                ui.item.addClass('tilt');
                that.tiltDirection(ui.item);
            },
            stop: function (event, ui) {
                ui.item.removeClass("tilt");
                $("html").unbind('mousemove', ui.item.data("move_handler"));
                ui.item.removeData("move_handler");

                var cardId = $(ui.item[0]).data('id');
                var columnId = $(ui.item[0]).closest('.column').data('id');
                console.log(cardId , columnId);
            },
            placeholder: {
                element: function (currentItem) {
                    //return $("<div class='drag-placeholder'>drop here</div>")[0];
                    return $("<div></div>");
                },
                update:function(container, p){
                    //console.log(container, p);
                    //alert($(ui.item).text());
                }
            }
        });

        $(".portlet")
            .addClass("ui-widget ui-widget-content ui-helper-clearfix ui-corner-all")
            .find(".portlet-header")
            .addClass("ui-widget-header ui-corner-all")
            .prepend("<span class='ui-icon ui-icon-minusthick portlet-toggle'></span>");

        $(".portlet-toggle").click(function () {
            var icon = $(this);
            icon.toggleClass("ui-icon-minusthick ui-icon-plusthick");
            icon.closest(".portlet").find(".portlet-content").toggle();
        });
    },
    tiltDirection: function(item) {
        var left_pos = item.position().left,
            move_handler = function (e) {
                if (e.pageX >= left_pos) {
                    item.addClass("right");
                    item.removeClass("left");
                } else {
                    item.addClass("left");
                    item.removeClass("right");
                }
                left_pos = e.pageX;
            };
        $("html").bind("mousemove", move_handler);
        item.data("move_handler", move_handler);
    }
});