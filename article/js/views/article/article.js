define([
  'jquery',
  'underscore',
  'backbone',
  'text!template/article/article.html'
],function($,_,Backbone,tpl){
  var MainView = Backbone.View.extend({

    initialize : function(){
      this.template = _.template(tpl);
    },
    render     : function(){
      $(this.el).html(this.template());
      $.mobile.changePage(this.el,{ reverse : false , changeHash : false});
    }

  });

  return MainView;
});
