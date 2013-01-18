define([
  'jquery',
  'underscore',
  'backbone',
  'collection/users',
  'models/user',
  'models/session',
  'views/register',
  'vm',
  'text!template/home/_home.html'
],function($,_,Backbone,
  Users,User,
  Session,
  RegisterView,
  VM,
  tpl){

  var MainView = Backbone.View.extend({
    initialize : function(){
      this.template   =  _.template(tpl);
      this.collection = new Users;
      this.model = new User;
      this.render();
    },
    events : {
      "click #register" : "register",
      "click #login" : "login" 
    },
    register : function(){
      VM.HeaderView.setHeader("Register");
      VM.RegisterView.render();
    },
    login : function(){
      var email = $("#login-email").val(),
          pwd   = $("#login-pwd").val();

      Session.save(email,pwd);

    },
    render : function(){
      $(this.el).html(this.template());
    }

  });

  return MainView;

});
