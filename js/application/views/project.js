'use strict';

define([
  'jquery',
  'underscore',
  'jqueryui/widgets/autocomplete',
  'backbone',
  'handlebars',
  'views/crime',
  'text!templates/project.html'
], function($, _, autocomplete, Backbone, hbs, CrimeView, projectsTemplate){

  var ProjectsView = Backbone.View.extend({
    el: '#page',

    template: hbs.compile(projectsTemplate),

    events: {
       'click .find' : 'validateAndDisplayCrimeDataAndMap'
    },

    /*
     * initAutoComplete method  initializes the autocomplete method
     * It is used to connect the postcode collection to the autocomplete input 
     * to provide the autocomplete list when user types into the postcode input field
    */
    initAutoComplete: function() {

      var that = this;
      this.$('#postcode').autocomplete({
        minLength: 2,
        source: function (request, response) {
          that.postcodeCollection.searchTerm = request.term;
          that.postcodeCollection.fetch({
            success: function (collection, data) {
              response(data.result);
            }
          });
        },
        error: function (event, ui) {
          //your error code here
        }
      });
    },

    /*
     * Initializes the project view
     * @param geoLocationModel  instance of GeoLocationModel received from router
     * @param postCodeModel instance of PostCodeModel received from router
     * @param postcodeCollection instance of PostcodeCollection received from router
    */
    initialize: function(geoLocationModel, postCodeModel, postcodeCollection) {
      this.geoLocationModel = geoLocationModel;
      this.postcodeCollection = postcodeCollection;
      this.postCodeModel = postCodeModel;

      this.render();
      
    },

    /*
     * render function
     * @param data  optional data that can be passed on to the template
    */
    render: function(data){
      data = data || {};
      this.$el.html(this.template(data));
      this.initAutoComplete();
      this.crimeView = new CrimeView();
      //Hide loader when ever crime data is loaded
      this.listenTo(this.crimeView, 'rendered', this.hideLoader);
    },

    /*
     * Show loader display, this is currently called when a valid postcode is submitted for getting crime data
    */
    showLoader: function () {
      $('.data-container .loading-container').removeClass('hidden');
    },

    /*
     * Hide loader display, this is currently called when crimeView completes rendering
    */
    hideLoader: function () {
      $('.data-container .loading-container').addClass('hidden');
    },

    /*
     * getGeoLocation gets the lattitude and longitude for given postcode by calling the geolocation model
     * and returns a crime model with the latitude and longitude set, 
     * which is then passed to the crime view to fetch and render
     * @param postCode  postcode for which crime data needs to be retreived
    */
    getGeoLocationAndShowCrimeStats: function (postCode) {
      var that = this;
      this.showLoader(); // We are going to get geolocation and rerender the crime view, hence show loader
      this.geoLocationModel.setPostCode(postCode);
      this.geoLocationModel.fetch({
        success: function (model, result) {
          var crimeModel = that.geoLocationModel.getCrimesModelForLocation();
          crimeModel.set('postCode', that.postCodeUntrimmed);

          //Setting time out so that the loader doesnt flash, and user has time to take in that new data is loaded
          setTimeout(function () {
            that.crimeView.updateModel(crimeModel);
          }, 400);
        }
      });
    },

    /*
     * Display crime data and map for given postcode if valid postcode
     * e event object  clicked event object 
    */
    validateAndDisplayCrimeDataAndMap: function(e) {
      e.preventDefault();

      var that = this;
      this.postCodeUntrimmed = this.$('#postcode').val();
      var postCode = this.postCodeUntrimmed.replace(/\s+/, '');
      if (postCode.length) {
        this.postCodeModel.setPostCode(postCode);
        this.postCodeModel.fetch({
          success: function (model, response) {
            if (response.result) {
              $('.error').addClass('hide');
              that.getGeoLocationAndShowCrimeStats(postCode);
            } else {
              $('.error').removeClass('hide');
            }
          }
        });
      }
    }
  });

  return ProjectsView;
});