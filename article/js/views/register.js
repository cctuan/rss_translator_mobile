define([
  'jquery',
  'underscore',
  'backbone',
  'models/session',
  'vm',
  'text!template/home/_register.html'
],function($ , _ , Backbone , Session ,VM ,tpl){

  var Register = Backbone.View.extend({
    initialize : function(){

      this.template = _.template(tpl);
      this.pwdValFlag = false;
      this.errorMsg = "";
    },
    events : {
      "click #submit" : "submit",
      "click #cancel" : "cancel",
      "keypress #con-password" : "validate"

    },
    validate : function(e){
      var self = this;
      setTimeout(function(){
      if($(e.currentTarget).val() != $("#r-password").val()){
        self.pwdValFlag = false;
        $("#info-repwd").text("wrong");
      }else{
        self.pwdValFlag = true;
        $("#info-repwd").text("right"); 
      }
      },50);
    },
    cancel : function(){
      VM.HomeView.render();
    },
    submit : function(){
      var result = this.validateAll();
      if(result){
        Session.newUser(result);
      }else{
        $("#error-register").text(this.errorMsg); 
      }

    },
    validateAll : function(){

      var email = $("#r-email").val(),
          password = $("#r-password").val(),
          username = $("#r-username").val();

      if(!email){
        this.errorMsg = "Email Empty ";
        return false;
      }else if(!this.pwdValFlag){
        this.errorMsg = "PWD not correct";
        return false;
      }else if(!password){
        this.errorMsg = "Empty Pwd";
        return false;
      }else if(!username){
        this.errorMsg = "Empty username";
        return false;
      }
      return {
        email : email,
        password : password ,
        username : username
      };
    },
    render : function(){
      $(this.el).html(this.template());
    }
    
  });

  return Register;
});
