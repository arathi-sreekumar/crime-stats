'use strict';

define([
  'jquery',
  'underscore',
  'backbone',
  'handlebars',
  'chartist',
  'chartistTooltip',
  'views/googleMaps',
  'text!templates/crime.html'
], function($, _, Backbone, hbs, Chartist, ChartistTooltip, MapsView, crimeStatsTemplate){

  //Private functions
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

  /*
     * Draw bar chart
     * @param crimeStats  the crime data for the chart
     * @return chart  chart object of the bar chart drawn
    */
  function drawCrimeChart(crimeStats, categoryColours) {
    var labels = [], values = [];

    _.each(crimeStats, function (value, key, list) {
      labels.push(key);
      values.push(value);
    });

    var chart = new Chartist.Bar('.ct-chart', {
      labels: labels,
      series: [values]
    }, {
      seriesBarDistance: 5,
      reverseData: true,
      horizontalBars: true,
      axisY: {
        offset: 70
      },
      plugins: [
        Chartist.plugins.tooltip()
      ]
    });

    setBarColours(chart, categoryColours);

    return chart;
  }

  /*
   * Colour the bars based on the category
   * @param chart  chart object of the bar chart drawn
   * @param categoryColours  map of colours for each category
   * @return chart  chart object of the bar chart drawn
  */
  function setBarColours(chart, categoryColours) {
    chart.on('draw', function(context) {
      // First we want to make sure that only do something when the draw event is for bars. Draw events do get fired for labels and grids too.
      if(context.type === 'bar') {
        var category = context.axisY.options.ticks[context.index];
        context.element.attr({
          // Now we set the style attribute on our bar to override the default color of the bar.
          style: 'stroke: #' + categoryColours[category] + ';'
        });
      }
    });
    return chart;
  }

  var CrimeView = Backbone.View.extend({

    el: '#crime-stats',

    template: hbs.compile(crimeStatsTemplate),    

    events:{
    },
    
    initialize: function(){
      this.mapsView = new MapsView();
    },

    render: function (crimeStats, date) {
      $(this.el).html(this.template({crimeStats: crimeStats, date: date}));
      this.renderCrimeChart(crimeStats);
      this.showMap();
      $('.data-container .loading-container').addClass('hidden');
    },

    /*
     * show map function renders the map
     * @param postCode  the postcode to display the map for
    */
    showMap: function () {
      this.mapsView.render(this.model.crimeLocationData, this.model.latitude, this.model.longitude);
    },

    /*
     * Render crime data as a horizontal bar chart
     * @param: crimeStats  the crime data
    */
    renderCrimeChart: function (crimeStats) {
      drawCrimeChart(crimeStats, this.model.categoryColours);
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
          that.render(model.categoryData, date, model.crimeLocationData);
        }
      });
    }

  });
  return CrimeView;
});