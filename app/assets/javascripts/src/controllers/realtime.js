Ext.define('Gowane.controllers.Realtime', {
  extend: 'Ext.app.Controller',
  stores: ['Gowane.stores.Devices'],
  refs: [{
    selector: 'viewport sharedsidecolumn',
    ref: 'sideColumn'
  }],

  init: function() {
  },

  onLaunch: function() {
    Ext.data.StoreManager.lookup('DeviceStore').load();
  }
});

