define([
  'jquery',
  'underscore',
  'backbone'//,
//  'text!template/main.html'
],function($,_,Backbone){
  var MainView = Backbone.View.extend({
    el : "body",
    events : {
    },

    initialize : function(){
      this.template = _.template(tpl);
    },
    render     : function(){
       
      $(this.el)
        .html(this.template());
    }

  });

  return MainView;
});
