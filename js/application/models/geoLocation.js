'use strict';
define([
  'underscore',
  'backbone',
  'models/crime'
], function(_, Backbone, CrimeModel) {
  
  var PostCodeModel = Backbone.Model.extend({
  	url: function () {
  		return 'http://uk-postcodes.com/postcode/' + this.postCode + '.json';
  	},

    /*
     * setPostCode  sets the postcode for geolocation model
     * @param postcode  string postcode value
    */
  	setPostCode: function (postCode) {
  		this.postCode = postCode;
  	},

  	initialize: function () {
  	},

  	parse: function (data) {
  		return {latitude: data.geo.lat.toFixed(6), longitude: data.geo.lng.toFixed(6)};
  	},

    /*
     * getCrimesModelForLocation  creates a crime model with latitude and longitude initialized and returns it
     * @return crimeModel   an object of crime model with its latitude and longitude values initialized
    */
  	getCrimesModelForLocation: function() {
  		var crimeModel = new CrimeModel(this.get('latitude'), this.get('longitude'));
  		return crimeModel;
  	}

  });

  return PostCodeModel;

});