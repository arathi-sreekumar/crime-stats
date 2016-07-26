'use strict';

define([
  'underscore',
  'backbone',
  'sinon',
  'collections/postcode'
], function(_, Backbone, sinon, PostCodeCollection) {

  var mockPostCodes = {'status':200,'result':['BN11 1AA','BN11 1AF','BN11 1AH','BN11 1AJ','BN11 1AL','BN11 1AN','BN11 1AQ','BN11 1AR','BN11 1AS','BN11 1AW']};

  describe('Collection: PostCodeCollection', function() {

    it('should be defined', function() {
      expect(PostCodeCollection).toBeDefined();
    });

    it('can be instantiated', function() {
      var postCodeCollection = new PostCodeCollection();
      expect(postCodeCollection).toBeDefined();
    });

    describe('fetches postcode data for autocomplete', function () {
      beforeEach(function () {
        this.server = sinon.fakeServer.create();
        var partialPostCode = 'BN11';
        this.postCodeCollection = new PostCodeCollection();
        this.postCodeCollection.searchTerm = partialPostCode;
        this.server.respondWith('GET', 'http://api.postcodes.io/postcodes/' + partialPostCode + '/autocomplete',
          [ 200, { 'Content-Type': 'application/json' },
          JSON.stringify(mockPostCodes)
          ]);
        this.postCodeCollection.fetch();
        this.server.respond();
      });

      afterEach(function() {
        this.server.restore();
      });

      it('returns postcodes', function () {
        expect(this.postCodeCollection.models).toBeDefined();
        expect(this.postCodeCollection.length).toBe(mockPostCodes.result.length);
      });
    });
  });

});