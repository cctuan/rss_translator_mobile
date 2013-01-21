define([
  'jquery',
  'underscore',
  'backbone',
  'text!template/header.html'
],function($ , _, Backbone, tpl){
  
  var Header = Backbone.View.extend({

    events : {
      "click #back" : "back"
    },
    initialize : function(){
      this.template = _.template(tpl);
      this.render();  
    },
    back : function(){
      window.history.back();
    },
    switchLoginout : function(stat){
      switch(stat){
        case true:
          $("#loginout").attr("href","#logout").text("logout");
        break;
        case false:
          $("#loginout").attr("href","#login").text("login");
        break;
      }
      return true;
    },
    setHeader : function(text){
      $("#header-title").text(text);
    },
    render : function(){
      $(this.el).html(this.template());
    }

  });
  return Header;

});
