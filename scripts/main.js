'use strict';
var Application = (function () {
    var curPageView = null;
    var showPage = function (pageView, options) {
        curPageView && curPageView.destroy();
        curPageView = new pageView(options);
        $('[data-js-page-container]').html(curPageView.$el);
    };
    return {
        showPage: showPage
    };
})();
var generateEventsListStr = function () {
    var str = "";
    str += "<ul>";
    for (var i = 0; i < 5; i++) {
        str += "<li><a href=\"#event/" + (i + 1) + "\">Event - " + (i + 1) + "</a></li>";
    }
    str += "</ul>"
    return str;
}
var Router = Backbone.Router.extend({
    routes: {
        "": "start", // ""
        "events": "events", // #events
        "event/:eventNumber": "event", // #event/id7
        "personal": "personal" // #personal
    }
    , start: function () {
            Application.showPage(Main);
        }
        //    , events: function () {
        //        Application.showPage(Events);
        //    }
        
    , event: function (eventNumber) {
        Application.showPage(Event, eventNumber);
    }
    , personal: function () {
        Application.showPage(Personal);
    }
});
var Main = Backbone.View.extend({
    initialize: function () {
        this.render();
        this.avatar = new UserAvatar();
        this.avatar.render();
        $('[data-js-avatar]', this.$el).html(this.avatar.$el);
    }
    , render: function () {
        this.$el.html("<div data-js-avatar></div><h1>Events</h1>" + generateEventsListStr());
        return this;
    }
    , destroy: function () {
        this.$el.remove();
    }
});
//var Events = Backbone.View.extend({
//    initialize: function () {
//        this.render();
//        this.avatar = new UserAvatar();
//        this.avatar.render();
//        $('[data-js-avatar]', this.$el).html(this.avatar.$el);
//    }
//    , render: function () {
//        this.$el.html("<div data-js-avatar></div><h1>Events</h1>" + generateEventsListStr());
//        return this;
//    }
//    , destroy: function () {
//        this.$el.remove();
//    }
//});
var Event = Backbone.View.extend({
    initialize: function (eventNumber) {
        this.render(eventNumber);
        this.avatar = new UserAvatar();
        this.avatar.render();
        $('[data-js-avatar]', this.$el).html(this.avatar.$el);
    }
    , render: function (eventNumber) {
        this.$el.html("<div data-js-avatar></div><h1>Event" + eventNumber + "</h1><a href=\"\">Main page.</a > ");
        return this;
    }
    , destroy: function () {
        this.$el.remove();
    }
});
var Personal = Backbone.View.extend({
    initialize: function () {
        this.render();
    }
    , render: function () {
        this.$el.html("<h1>Your avatar here!</h1><img src=\"cFOL3eZxYaM.jpg\"><a href=\"\">Main page.</a>");
        return this;
    }
    , destroy: function () {
        this.$el.remove();
    }
});
var UserAvatar = Backbone.View.extend({
    initialize: function () {
        this.render();
    }
    , render: function () {
        this.$el.html("<a href=\"#personal\"><img src=\"cFOL3eZxYaM.jpg\" width=\"189\"></a>");
        return this;
    }
    , destroy: function () {
        this.$el.remove();
    }
});
var controller = new Router;
Backbone.history.start();