'use strict';

define([
  'jquery',
  'underscore',
  'backbone',
  'sinon',
  'views/googleMaps'
], function($, _, Backbone, sinon, GoogleMapsView) {

  var postcode = 'BN11UE';

  describe('Views: Crime', function() {

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

      it('should render iframe with correct src', function () {
        this.mapsView.render(postcode);
        var apiKey = 'AIzaSyCBUAx3W_ykWX9gSePohkLo-TRTeNV9iwI';
        var iframeSrcUrl = 'https://www.google.com/maps/embed/v1/place?key=' + apiKey + '&q=' + postcode;
        expect($(this.mapsView.el).find('iframe').attr('src')).toBe(iframeSrcUrl);
      });

      afterEach(function () {
        this.mapsView.remove();
        $('#google-maps').remove();
      });
    });

  });

});