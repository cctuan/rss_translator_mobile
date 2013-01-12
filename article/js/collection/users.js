define([
  'jquery',
  'underscore',
  'backbone',
  'models/user'
],function($,_,Backbone,Model){

  var User = Backbone.Collection.extend({
    model : Model   ,
    url   : "/api/user"


  });

  return User;
});
