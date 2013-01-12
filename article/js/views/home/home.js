define([
  'jquery',
  'underscore',
  'backbone',
  'collection/users',
  'models/user',
  'models/session',

],function($,_,Backbone,Users,User,Session,tpl){
  var MainView = Backbone.View.extend({
    el : 'body',
    initialize : function(){

      this.template = _.template(tpl);
      this.collection = new Users;
      this.model = new User;
    },
    events : {
      "click #login" : "login" 
    },
    login : function(){
      var email = $("#login-email").val(),
          pwd   = $("#login-pwd").val();

      Session.save(email,pwd);

    },
    render : function(){
      
    }

  });

  return MainView;

});
