'use strict';

define([
  'jquery',
  'underscore',
  'backbone',
  'handlebars',
  'text!templates/crime.html'
], function($, _, Backbone, hbs, crimeStatsTemplate){

  /*
   * Function to get verbose date from date
   * @param dateString  date input in string format 'yyyy-mm' eg: '2016-06'
   * @return verboseDate   date as string in format 'MMM yyyy' eg: 'June 2016'
  */
  function getDateVerbose(dateString) {
    var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
    'July', 'August', 'September', 'October', 'November', 'December'];
    var date = dateString.split('-');
    var month = parseInt(date[1] - 1);
    var verboseDate = monthNames[month] + ' ' + date[0];
    return verboseDate;
  }

  var GoogleMapsView = Backbone.View.extend({

    el: '#crime-stats',

    template: hbs.compile(crimeStatsTemplate),    

    events:{
    },
    
    initialize: function(){
    },

    render: function (crimeStats, date) {
      $(this.el).html(this.template({crimeStats: crimeStats, date: date}));
    },

    /*
     * Updatemodel function, updates the view model with the input model
     * @param model  a crime model passed into the view
     * Sets the view model to input model and fetches the model data and renders the view
    */
    updateModel: function (model) {
      var that = this;
      this.model = model;
      model.fetch({
        success: function (model, data) {
          var date = getDateVerbose(model.during);
          that.render(model.categoryData, date);
        }
      });
    }

  });
  return GoogleMapsView;
});