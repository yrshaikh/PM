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

var IssueListingView = CommonIssueListingView.extend({
    template : _.template($('#issue-list-template').html()),
    render: function (data) {
        var that = this;
        var jsonData = {"states": this.collection.toJSON()};
        this.$el.html(this.template(jsonData));
        this.initBoard();
        this.stopLoader();
        return this;
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