/**
 *
 * -> Home View
 */
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
      this.render();
    },

    render: function () {
      $(this.el).html(this.template({postCode: 'BN11 3AT'}));
    }

  });
  return GoogleMapsView;
});