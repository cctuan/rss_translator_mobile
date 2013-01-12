define([
  'jquery',
  'backbone',
  'views/home/home',
  'views/home/login',
  'views/home/register',
  'views/picture/picture',
  'views/article/article',
  'views/nav/main',
  'views/logout'
],function($,Backbone,
  HomeView ,
  LoginView,
  RegisterView,
  PictureView,
  ArticleView,
  NavView,
  LogoutView
  ){
  var Router = Backbone.Router.extend({
    initialize : function() {
      
      this.navView      =   new NavView({el : "#navView"});
      this.pictureView  =   new PictureView({el : "#pictureView"});
      this.articleView  =   new ArticleView({el:"#articleView"});
      this.logoutView   =   new LogoutView({el:"#logoutView"});
      Backbone.history.start();
    },

    routes : {
      
      "pictureView" : "picture",
      "articleView" : "article",
      "navView"     : "nav",
      "logoutView"      : "logout",
      ""            :"nav"
    },
    nav    : function(){
      this.navView.render();
    },
    home   : function(){
        
    },
    main   : function(){
    },
    picture: function(){
      this.pictureView.render();         
    },
    article   : function(){
      this.articleView.render();
    },
    logout  : function(){
      this.logoutView.render();

    },
    changePage : function(page){
      $(page.el).attr('data-role', 'page');
      page.render();
      $('body').append($(page.el));
      $.mobile.changePage($(page.el), {changeHash:false});
    }
  });
  return Router;


});
