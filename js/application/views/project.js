'use strict';

define([
  'jquery',
  'underscore',
  'jqueryui/widgets/autocomplete',
  'backbone',
  'models/project',
  'collections/projects',
  'text!templates/project.html'
], function($, _, autocomplete, Backbone, ProjectModel, ProjectsCollection, projectsTemplate){

  var ProjectsView = Backbone.View.extend({
    el: $('#page'),

    events: {
       'click .find' : 'getGeoLocation'
    },
    render: function(){

      this.$el.html(projectsTemplate);

      var project0 = new ProjectModel({title: 'Cross Domain', url: 'https://github.com/thomasdavis/backbonetutorials/tree/gh-pages/examples/cross-domain'}); 

      var aProjects = [project0];

      var projectsCollection = new ProjectsCollection(aProjects);  

      // Move this to collections
      this.$('#postcode').autocomplete({
        minLength: 2,
        source: function (request, response) {
          var url = 'http://api.postcodes.io/postcodes/' + request.term + '/autocomplete';
          $.ajax({
            url: url,
            success: function (data) {
              response(data.result);
            },
          });
        },
        error: function (event, ui) {
          //your error code here
        }
      });

      //get lattitude and longitude from post code
      //api.zippopotam.us/GB/AB1
      //var projectsListView = new ProjectsListView({ collection: projectsCollection}); 
      
      //projectsListView.render(); 

    },

    getGeoLocation: function (e) {
      e.preventDefault();
      var postCode = this.$('#postcode').val().replace(/\s+/, '');
      var url = 'http://uk-postcodes.com/postcode/' + postCode + '.json';
      $.ajax({
          url: url,
          success: function (data) {
            console.log(data);
            var date = new Date();
            var currentYearMonth = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2);
            var url = 'https://data.police.uk/api/crimes-street/all-crime?lat=' + data.geo.lat.toFixed(6) + '&lng=' + data.geo.lng.toFixed(6);
            $.ajax({
              url: url,
              success: function (data) {
                console.log(data);
              }
            });
          }
      });
    }
  });

  return ProjectsView;
});