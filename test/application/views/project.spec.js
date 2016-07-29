'use strict';

define([
  'jquery',
  'underscore',
  'backbone',
  'models/geoLocation',
  'models/postcode',
  'collections/postcode',
  'views/project'
  ], function($, _, Backbone, GeoLocationModel, PostCodeModel, PostcodeCollection, ProjectsView) {

    describe('Views: Project View', function() {
      it('should be defined', function () {
        expect(ProjectsView).toBeDefined();
      });

      describe('Instantiating project view', function () {
        beforeEach(function () {
          $('body').append('<div id="page"></div>');
          var geoLocationModel = new GeoLocationModel();
          var postcodeCollection = new PostcodeCollection();
          var postCodeModel = new PostCodeModel();
          this.projectView = new ProjectsView(geoLocationModel, postCodeModel, postcodeCollection);
        });

        it('can be instantiated', function() {
          expect(this.projectView).not.toBeNull();
        });

        it('should have element defined', function () {
          expect(this.projectView.el).toBeDefined();
        });

        it('should render view', function () {
          //To do render testing
        });

        afterEach(function () {
          this.projectView.remove();
          $('#page').remove();
        });
      });
    });

  });