'use strict';

define([
  'underscore',
  'backbone',
  'sinon',
  'models/crime'
], function(_, Backbone, sinon, CrimeModel) {

  var mockCrimeData = [{'category':'anti-social-behaviour','location':{'latitude':'50.824601','street':{'id':1168460,'name':'On or near Crown Street'},'longitude':'-0.148384'},'month':'2016-05'},
                       {'category':'anti-social-behaviour','location':{'latitude':'50.820274','street':{'id':1168249,'name':'On or near Nightclub'},'longitude':'-0.138660'},'month':'2016-05'},
                       {'category':'anti-social-behaviour','location':{'latitude':'50.820274','street':{'id':1168249,'name':'On or near Nightclub'},'longitude':'-0.138660'},'month':'2016-05'}];

  describe('Model: CrimeModel', function() {

    it('should be defined', function() {
      expect(CrimeModel).toBeDefined();
    });

    it('can be instantiated', function() {
      var latitude = 50.823692, longitude = -0.138155;
      var crimeModel = new CrimeModel(latitude, longitude);
      expect(crimeModel).not.toBeNull();
    });

    it('has latitude and longitude set', function() {
      var latitude = 50.823692, longitude = -0.138155;
      var crimeModel = new CrimeModel(latitude, longitude);
      expect(crimeModel.latitude).toBe(latitude);
      expect(crimeModel.longitude).toBe(longitude);
    });

    describe('fetches crime data', function () {
      beforeEach(function () {
        this.server = sinon.fakeServer.create();
        this.latitude = 50.823692;
        this.longitude = -0.138155;
        this.crimeModel = new CrimeModel(this.latitude, this.longitude);
        this.server.respondWith('GET', 'https://data.police.uk/api/crimes-street/all-crime?lat=' + this.latitude + '&lng=' + this.longitude,
          [ 200, { 'Content-Type': 'application/json' },
          JSON.stringify(mockCrimeData)
          ]);
        this.crimeModel.fetch();
        this.server.respond();
      });

      afterEach(function() {
        this.server.restore();
      });

      it('check if crime data were fetched', function() {
        expect(this.crimeModel.during).toBeDefined();
        expect(this.crimeModel.during).toBe('2016-05');
        expect(this.crimeModel.categoryData).toEqual({'anti-social-behaviour': 3});
        expect(this.crimeModel.get('data').length).toEqual(mockCrimeData.length);
      });
    })
  });

});