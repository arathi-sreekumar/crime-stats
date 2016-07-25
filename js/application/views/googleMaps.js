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
    },

    render: function (postCode) {
      $(this.el).html(this.template({postCode: postCode}));
    }

  });
  return GoogleMapsView;
});