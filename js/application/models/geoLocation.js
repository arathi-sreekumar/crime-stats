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

  	setPostCode: function (postCode) {
  		this.postCode = postCode;
  	},

  	initialize: function () {
  	},

  	parse: function (data) {
  		this.latitude = data.geo.lat.toFixed(6);
  		this.longitude = data.geo.lng.toFixed(6);
  		return {latitude: data.geo.lat.toFixed(6), longitude: data.geo.lng.toFixed(6)};
  	},

  	getCrimesModelForLocation: function() {
  		var crimeModel = new CrimeModel(this.latitude, this.longitude);
  		return crimeModel;
  	}

  });

  return PostCodeModel;

});