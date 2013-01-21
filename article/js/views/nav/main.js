define([
  'jquery',
  'underscore',
  'backbone',
  "text!template/nav/_main.html"
],function($,_,Backbone,tpl){
  var NavView = Backbone.View.extend({
    events : {
    },


    initialize : function(){
      this.template = _.template(tpl);
    },
    render     : function(){
      $(this.el).html(this.template());

      
    }

  });

  return NavView;
});
