'use strict';

define([
  'jquery',
  'underscore',
  'backbone',
  'sinon',
  'views/googleMaps'
], function($, _, Backbone, sinon, GoogleMapsView) {

  var postcode = 'BN11UE';
  var locations = [['anti-social-behaviour,On or near Roderick Avenue', '50.797351','0.000293', 1, 'FFB300'],
                    ['anti-social-behaviour,On or near Walesbeech Road','50.800182', '-0.033973', 2, 'FFB300']];
  var latitude = 50.794994;
  var longitude = -0.018071;

  describe('Views: GoogleMapsApi', function() {

    it('should be defined', function () {
      expect(GoogleMapsView).toBeDefined();
    });

    describe('Instantiating googleMaps view', function () {
      beforeEach(function () {
        $('body').append('<div id="google-maps"></div>');
        this.mapsView = new GoogleMapsView();
      });

      it('can be instantiated', function() {
        expect(this.mapsView).not.toBeNull();
      });

      it('should have element defined', function () {
        expect(this.mapsView.el).toBeDefined();
      });

      it('should render map with correct locations', function () {
        //To do write stub for google api
        //this.mapsView.render(locations, latitude, longitude);
        //expect($(this.mapsView.el).find('iframe').attr('src')).toBe(iframeSrcUrl);
      });

      afterEach(function () {
        this.mapsView.remove();
        $('#google-maps').remove();
      });
    });

  });

});