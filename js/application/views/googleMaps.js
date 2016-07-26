'use strict';

define([
  'jquery',
  'underscore',
  'backbone',
  'handlebars',
  'text!templates/googleMaps.html'
], function($, _, Backbone, hbs, googleMapsTemplate){

  var GoogleMapsView = Backbone.View.extend({

    el: '#google-maps',

    template: hbs.compile(googleMapsTemplate),    

    events:{
    },
    
    initialize: function(){
      this.apiKey = 'AIzaSyCBUAx3W_ykWX9gSePohkLo-TRTeNV9iwI';
    },

    render: function (postCode) {
      $(this.el).html(this.template({postCode: postCode, apiKey: this.apiKey}));
    }

  });
  return GoogleMapsView;
});