define([
  'jquery',
  'underscore',
  'backbone',
  "text!template/nav/main.html"
],function($,_,Backbone,tpl){
  var NavView = Backbone.View.extend({
    events : {
    },

    logout : function(){
      
    },

    initialize : function(){
      this.template = _.template(tpl);
    },
    render     : function(){
      $.mobile.changePage(
        "#navView", 
        { changeHash : false}
      );
      $(this.el).html(this.template()).trigger("pagecreate");

      
    }

  });

  return NavView;
});
