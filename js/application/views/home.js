/**
 *
 * -> Home View
 */
'use strict';

define([
  'jquery',
  'underscore',
  'backbone',
  'handlebars',
  'text!templates/home.html'
], function($, _, Backbone, hbs, homePageTemplate){

  var HomePage = Backbone.View.extend({

    el: '#page',

    template: hbs.compile(homePageTemplate),    

    events:{
    },
    
    initialize: function(){
      this.render();
    },

    render: function () {
      $(this.el).html(this.template);
    }

  });
  return HomePage;
});