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

    render: function (crimeLocations, latitude, longitude) {
      $(this.el).html(this.template());

      var locations = crimeLocations;
      var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 14,
          center: new google.maps.LatLng(latitude, longitude),
          mapTypeId: google.maps.MapTypeId.ROADMAP
      });
      var infowindow = new google.maps.InfoWindow();
      var marker, i;
      for (i = 0; i < locations.length; i++) {
          var pinColor = locations[i][4];
          var pinImage = new google.maps.MarkerImage('http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|' + pinColor,
          new google.maps.Size(21, 34),
          new google.maps.Point(0,0),
          new google.maps.Point(10, 34));
          marker = new google.maps.Marker({
              position: new google.maps.LatLng(locations[i][1], locations[i][2]),
              map: map,
              icon: pinImage
          });
          google.maps.event.addListener(marker, 'click', (function (marker, i) {
              return function () {
                  infowindow.setContent(locations[i][0]);
                  infowindow.open(map, marker);
              };
          })(marker, i));
      }

    }

  });
  return GoogleMapsView;
});