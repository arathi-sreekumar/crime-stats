'use strict';

define([
  'jquery',
  'underscore',
  'backbone',
  'sinon',
  'views/crime',
  'models/crime'
], function($, _, Backbone, sinon, CrimeView, CrimeModel) {

  var mockCrimeData = [{'category':'anti-social-behaviour','location':{'latitude':'50.824601','street':{'id':1168460,'name':'On or near Crown Street'},'longitude':'-0.148384'},'month':'2016-05'},
                       {'category':'anti-social-behaviour','location':{'latitude':'50.820274','street':{'id':1168249,'name':'On or near Nightclub'},'longitude':'-0.138660'},'month':'2016-05'},
                       {'category':'anti-social-behaviour','location':{'latitude':'50.820274','street':{'id':1168249,'name':'On or near Nightclub'},'longitude':'-0.138660'},'month':'2016-05'}];

  describe('Views: Crime', function() {

    it('should be defined', function () {
      expect(CrimeView).toBeDefined();
    });

    describe('Instantiating crime view', function () {
      beforeEach(function () {
        $('body').append('<div id="crime-stats"></div>');
        this.crimeView = new CrimeView();
      });

      it('can be instantiated', function() {
        expect(this.crimeView).not.toBeNull();
      });

      it('should have element defined', function () {
        expect(this.crimeView.el).toBeDefined();
      });

      it('should render data provided', function () {
        this.crimeView.render({'testing': 3}, 'May 2016');
        expect($(this.crimeView.el).find('h2').text()).toContain('May 2016');
        expect($(this.crimeView.el).find('table').text()).toContain('testing');
      });

      describe('updating model and rendering view', function () {
        beforeEach(function () {
          this.server = sinon.fakeServer.create();
          this.latitude = 50.823692;
          this.longitude = -0.138155;
          this.crimeModel = new CrimeModel(this.latitude, this.longitude);
          this.server.respondWith('GET', 'https://data.police.uk/api/crimes-street/all-crime?lat=' + this.latitude + '&lng=' + this.longitude,
            [ 200, { 'Content-Type': 'application/json' },
            JSON.stringify(mockCrimeData)
            ]);
        });

        it('updates model and renders data', function () {
          this.crimeView.updateModel(this.crimeModel);
          this.server.respond();
          expect(this.crimeView.model).toEqual(this.crimeModel);
          expect($(this.crimeView.el).find('h2').text()).toContain('May 2016');
          expect($(this.crimeView.el).find('table').text()).toContain('anti-social-behaviour');
        });

        afterEach(function () {
          this.server.restore();
        });
      });

      afterEach(function () {
        this.crimeView.remove();
        $('#crime-stats').remove();
      });
    });

  });

});