App.Services.Mapper = function() {
  this.cartography = new App.Services.Cartography();
};

_.extend(App.Services.Mapper.prototype, {

   featureFromEvent: function(event) {
    return this.toFeature(event);
   },

  toFeature: function(model, style) {
    var lonlat = this.cartography.mercatorCoordinates(model.get("longitude"), model.get("latitude"));
    var point = new OpenLayers.Geometry.Point(lonlat.lon, lonlat.lat);
    var feature = new OpenLayers.Feature.Vector(point, model);
    feature.id = model.id;
    if (style) feature.style = style;
    else feature.style = {pointRadius: 10, externalGraphic: "/assets/arrow.png", rotation: model.get("heading")};
    return feature;
  },

  toRealtimeFeature: function(model) {
    var style = {
      label: model.get("name"),
      labelOutlineColor: 'white',
      labelOutlineWidth: "4px",
      labelYOffset: 17,
      fontWeight: "bold",
      pointRadius: 10,
      externalGraphic: "/assets/arrow.png",
      rotation: model.get("heading")
    };
    return this.toGraphicFeature(model, style);
  },

  toGraphicFeature: function(model, style) {
    var lonlat = this.cartography.mercatorCoordinates(model.get("longitude"), model.get("latitude"));
    var point = new OpenLayers.Geometry.Point(lonlat.lon, lonlat.lat);
    var feature = new OpenLayers.Feature.Vector(point, model);
    feature.id = model.id;
    feature.style = style;
    return feature;
  },

  toPlaceFeatures: function(places) {
    return places.map(function(place) {
      return this.toPlaceFeature(place);
    }.bind(this))
   },

  toPlaceFeature: function(model) {
    var style = {
      label: model.get("name"),
      labelOutlineColor: 'white',
      labelOutlineWidth: "4px",
      labelYOffset: 17,
      fontWeight: "bold",
      fontColor: "#084a8c",
      pointRadius: 6,
      externalGraphic: "/assets/default/layout/tab-close-on.gif"
    };
    return this.toGraphicFeature(model, style);
  },

   toGeofenceFeatures: function(geofences) {
      var format = new OpenLayers.Format.WKT();
      var features = geofences.map(function(geofence) {
        return format.read(geofence.get("coordinates"));
      });
     return features;
   }

});