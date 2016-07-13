'use strict';

define([
  'jquery',
  'underscore',
  'backbone',
  'models/project',
  'collections/projects',
  'text!templates/project.html'
], function($, _, Backbone, ProjectModel, ProjectsCollection, projectsTemplate){

  var ProjectsView = Backbone.View.extend({
    el: $('#page'),
    render: function(){

      this.$el.html(projectsTemplate);

      var project0 = new ProjectModel({title: 'Cross Domain', url: 'https://github.com/thomasdavis/backbonetutorials/tree/gh-pages/examples/cross-domain'}); 

      var aProjects = [project0];

      var projectsCollection = new ProjectsCollection(aProjects);  
      //var projectsListView = new ProjectsListView({ collection: projectsCollection}); 
      
      //projectsListView.render(); 

    }
  });

  return ProjectsView;
});