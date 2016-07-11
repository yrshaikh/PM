/**
 * Created by yasser.s on 07/11/2016.
 */
var IssueCreateModel = CommonCreateModel.extend({
    defaults: function() {
        return {
            title: null,
            description: null,
            priority: null,
            assignee: null,
            sprint:null,
            category: null
        };
    },
    validation: {
        title: [{
            required: true,
            msg: 'This is a required field.'
        },{
            minLength: '10',
            msg: 'Too short. Minimum 10 characters are required.'
        }]
    }
});

var IssueCreateView = CommonCreateView.extend({
    events: {
        'click button#createBtn': 'create',
        'click .overlay-close': 'hide'
    },
    fillModelWithValues: function(){

    },
    childInitialize: function(){

    },
    show: function(){
        $(".overlay").removeClass("close");
        $(".overlay").addClass("open");
    },
    hide: function(){
        $(".overlay").removeClass("open");
        $(".overlay").addClass("close");
    }
});