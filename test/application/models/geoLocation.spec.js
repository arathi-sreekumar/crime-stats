'use strict';

define([
  'underscore',
  'backbone',
  'sinon',
  'models/geoLocation'
], function(_, Backbone, sinon, GeoLocationModel) {

  var postcode = 'BN11UE';
  var mockGeoLocation = {'postcode':'BN1 1UE','geo':{'lat':50.823692496859174,'lng':-0.1381546148494871,'easting':531234.0,'northing':104335.0}};

  describe('Model: GeoLocationModel', function() {

    it('should be defined', function() {
      expect(GeoLocationModel).toBeDefined();
    });

    it('can be instantiated', function() {
      var geoLocationModel = new GeoLocationModel();
      expect(geoLocationModel).not.toBeNull();
    });

    it('sets postcode for model', function () {
      var geoLocationModel = new GeoLocationModel();
      geoLocationModel.setPostCode(postcode);
      expect(geoLocationModel.postCode).toBe(postcode);
    });

    describe('fetches geo location data', function () {
      beforeEach(function () {
        this.server = sinon.fakeServer.create();
        this.geoLocationModel = new GeoLocationModel();
        this.geoLocationModel.setPostCode(postcode);
        this.server.respondWith('GET', 'http://uk-postcodes.com/postcode/' + postcode + '.json',
          [ 200, { 'Content-Type': 'application/json' },
          JSON.stringify(mockGeoLocation)
          ]);
        this.geoLocationModel.fetch();
        this.server.respond();
      });

      afterEach(function() {
        this.server.restore();
      });

      it('check if crime data were fetched', function() {
        expect(this.geoLocationModel.get('latitude')).toBe(mockGeoLocation.geo.lat.toFixed(6));
        expect(this.geoLocationModel.get('longitude')).toBe(mockGeoLocation.geo.lng.toFixed(6));
      });

      it('returns a crime model with latitude and longitude set', function() {
        var crimeModel = this.geoLocationModel.getCrimesModelForLocation();
        expect(crimeModel).toBeDefined();
        expect(crimeModel.latitude).toBe(this.geoLocationModel.get('latitude'));
        expect(crimeModel.longitude).toBe(this.geoLocationModel.get('longitude'));
      });
    });

  });

});