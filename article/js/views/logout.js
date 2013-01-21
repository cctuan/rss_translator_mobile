define([
  'jquery',
  'underscore',
  'backbone',
  'models/session',
  'vm',
  "text!template/logout.html"
],function($,_,Backbone,Session ,VM,tpl){
  var NavView = Backbone.View.extend({
    events : {
      "click #cancelllogout" : "cancel",
      "click #surelogout"    : "logout"
    },
    cancel : function(){
      window.history.back();  
    },
    logout : function(){
      Session.leave(function(u){
        VM.HeaderView.switchLoginout(false);
    //    VM.Router.off();
        VM.Router.navigate("/");
        Backbone.history.stop();
        delete VM.Router;
        VM.HomeView.render();
      });
      
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
