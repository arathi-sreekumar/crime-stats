'use strict';
define([
  'underscore',
  'backbone'
], function(_, Backbone) {
  
  var CrimeModel = Backbone.Model.extend({
  	url: function () {
  		return 'https://data.police.uk/api/crimes-street/all-crime?lat=' + this.latitude + '&lng=' + this.longitude;
  	},

  	initialize: function (latitude, longitude) {
  		this.latitude = latitude;
  		this.longitude = longitude;
  	},

  	parse: function (data) {
  		this.categoryData = _.countBy(data, 'category');
  		this.during = _.countBy(data, 'month');
  		return data;
  	}



  });

  return CrimeModel;

});