'use strict';
define([
  'underscore',
  'backbone'
], function(_, Backbone) {
  
  var PostCodeModel = Backbone.Model.extend({

    /*
     * Make a get request to the http://api.postcodes.io/postcodes/:postcode/validate
     * Parameter sent is the post code
     * Response json structure: { "status": 200, "result": false }
    */
  	url: function () {
  		return 'http://api.postcodes.io/postcodes/' + this.postcode + '/validate';
  	},

  	initialize: function () {

  	},

    setPostCode: function ( postcode ) {
      this.postcode = postcode;
    }

  });

  return PostCodeModel;

});