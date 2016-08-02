'use strict';

define([
  'jquery',
  'underscore',
  'backbone',
  'handlebars',
  'text!templates/googleMaps.html'
], function($, _, Backbone, hbs, googleMapsTemplate){

  //Private function
  /*
   * Render google maps with markers for locations centering at (latitude, longitude)
   * @param locations  array of geolocations to be marked on the map
   * @param latitude  the lattitude at which the map is to be centered
   * @param longitude  the longitude at which the map is to be centered
  */
  function renderMaps (locations, latitude, longitude) {
    var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 13,
          center: new google.maps.LatLng(latitude, longitude),
          mapTypeId: google.maps.MapTypeId.ROADMAP
      });
      var infowindow = new google.maps.InfoWindow();
      var marker, i;

      function setMarkerWrapper (marker, i) {
        return function setMarker () {
          infowindow.setContent(locations[i][0]);
          infowindow.open(map, marker);
        };
      }

      for (i = 0; i < locations.length; i++) {
          var pinColor = locations[i][4];
          var pinImage = new google.maps.MarkerImage('https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|' + pinColor,
          new google.maps.Size(21, 34),
          new google.maps.Point(0,0),
          new google.maps.Point(10, 34));
          marker = new google.maps.Marker({
              position: new google.maps.LatLng(locations[i][1], locations[i][2]),
              map: map,
              icon: pinImage
          });
          google.maps.event.addListener(marker, 'click', setMarkerWrapper(marker, i));
      }
  }

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
      renderMaps(crimeLocations, latitude, longitude);      
    }

  });
  return GoogleMapsView;
});