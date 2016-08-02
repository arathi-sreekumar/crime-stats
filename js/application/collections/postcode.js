'use strict';
define([
  'jquery',
  'underscore',
  'backbone',
  'models/postcode'
], function($, _, Backbone, PostCodeModel){
  var PostCodeCollection = Backbone.Collection.extend({

    url: function () {
      return 'https://api.postcodes.io/postcodes/' + this.searchTerm + '/autocomplete';
    },

    model: PostCodeModel,

    parse: function ( data ) {
      return data.result;
    },
    
    initialize: function(){

    }

  });
 
  return PostCodeCollection;
});