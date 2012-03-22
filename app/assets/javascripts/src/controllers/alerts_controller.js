App.Controllers.AlertsController = App.Controllers.Base.extend({

  appEvents: {
    "alerts:fetched": "onAlertsFetched",
    "editor:closed": "onEditorClosed",
    "alert:selected": "onAlertSelected",
    "alert:creating": "onAlertCreating",
    "alert:created": "onAlertCreated",
    "alert:saved": "onAlertSaved",
    "alert:deleted": "onAlertDeleted"
  },

  initialize: function(options) {
    this.init(options);
    this.listing = new App.Views.Alerts.Listing({pubsub: this.pubsub, el: "#canvas .listing"});
    this.editor = new App.Views.Alerts.Editor({pubsub: this.pubsub, el: "#canvas .editor"});
    this.toolbar = new App.Views.Alerts.Toolbar({pubsub: this.pubsub, el: "#canvas .toolbar"});
    new App.Collections.Alerts().fetch({success: function(results) {
        this.pubsub.trigger("alerts:fetched", results);
      }.bind(this)
    });
  },

  onAlertsFetched: function(alerts) {
    this.alerts = alerts;
    this.listing.render(alerts);
  },

  onEditorClosed: function() {
    this.editor.close();
  },

  onAlertSelected: function(device_id) {
    var alert = this.alerts.get(device_id);
    this.editor.render(alert);
  },

  onAlertCreated: function(attributes) {
    var alert = new App.Models.Alert(attributes);
    alert.save(null, {success: function(model) {
        this.alerts.add(model);
        this.pubsub.trigger("alerts:fetched", this.alerts);
        this.editor.close();
      }.bind(this)
    });
  },

  onAlertCreating: function() {
    this.editor.render({});
  },

  onAlertSaved: function(attributes) {
    var alert = this.alerts.get(attributes.id);
    alert.save(attributes, {success: function() {
        this.pubsub.trigger("alerts:fetched", this.alerts);
        this.editor.close();
      }.bind(this)
    });
  },

  onAlertDeleted: function(device_id) {
    var alert = this.alerts.get(device_id);
    this.alerts.remove(device);
    alert.destroy();
    this.editor.close();
    this.listing.render(this.alerts);
  }

});
