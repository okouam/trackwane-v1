App.Views.Users.Listing = App.Views.Base.extend({

  events: {
    "click tr" : "onUserSelect",
    "click button.save": "onUsereSave",
    "click button.delete": "onUserDelete",
    "click button.create": "onUserCreate"
  },

  initialize: function(options) {
    this.pubsub = options.pubsub;
    this.prepareTemplates();
  },

  onUsereSave: function() {
    this.pubsub.trigger("user:saved");
  },

  onUserDelete: function() {
    this.pubsub.trigger("user:deleted");
  },

  onUserSelect: function(evt) {
    var id = $(evt.currentTarget).data("id");
    this.pubsub.trigger("user:selected", id);
  },

  onUserCreate: function() {
    this.pubsub.trigger("user:created");
  },

  prepareTemplates: function() {
    var source = $("#listing-template").html();
    this.template = Handlebars.compile(source);
  },

  render: function(users) {
    this.$el.html(this.template(users));
    this.$el.show();
  }

});