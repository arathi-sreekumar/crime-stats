'use strict';
define([
  'underscore',
  'backbone'
], function(_, Backbone) {

  var kelly_colors_hex = [
    'FFB300', // Vivid Yellow
    '803E75',// Strong Purple
    'FF6800', // Vivid Orange
    'A6BDD7', // Very Light Blue
    'C10020', // Vivid Red
    'CEA262', // Grayish Yellow
    '817066', // Medium Gray

    // The following don't work well for people with defective color vision
    '007D34', // Vivid Green
    'F6768E', // Strong Purplish Pink
    '00538A', // Strong Blue
    'FF7A5C', // Strong Yellowish Pink
    '53377A', // Strong Violet
    'FF8E00', // Vivid Orange Yellow
    'B32851', // Strong Purplish Red
    'F4C800', // Vivid Greenish Yellow
    '7F180D', // Strong Reddish Brown
    '93AA00', // Vivid Yellowish Green
    '593315', // Deep Yellowish Brown
    'F13A13', // Vivid Reddish Orange
    '232C16', // Dark Olive Green
    ];
  
  var CrimeModel = Backbone.Model.extend({
  	url: function () {
  		return 'https://data.police.uk/api/crimes-street/all-crime?lat=' + this.latitude + '&lng=' + this.longitude;
  	},

  	initialize: function (latitude, longitude) {
  		this.latitude = latitude;
  		this.longitude = longitude;
  	},

    setCategoryColours: function() {
      var index = 0, that = this;
      this.categoryColours = {};
      _.each(this.categoryData, function (value, key, list) {
        that.categoryColours[key] = kelly_colors_hex[index];
        index += 1;
      });
    },

  	parse: function (data) {
      var that = this;
  		this.categoryData = _.countBy(data, 'category');
      this.setCategoryColours();
  		this.during = data[0].month;
      this.crimeLocationData = _.map(data, function(item, index) {
        var label = item.category + ',' + item.location.street.name;
        return [label, item.location.latitude, item.location.longitude, index + 1, that.categoryColours[item.category]];
      });
  		return {data: data};
  	}



  });

  return CrimeModel;

});