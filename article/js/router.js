define([
  'jquery',
  'backbone',
  'views/home/home',
  'views/picture/picture',
  'views/article/article',
  'views/nav/main',
  'views/logout',
  'vm'
],function($,Backbone,
  HomeView ,
  PictureView,
  ArticleView,
  NavView,
  LogoutView,
  VM
  ){
  var Router = Backbone.Router.extend({
    initialize : function() {
     
      VM.switchLoginout(true);

      VM.NavView      =   new NavView({el : "#container"});
      VM.PictureView  =   new PictureView({el : "#container"});
      VM.ArticleView  =   new ArticleView({el:"#container"});
      
      VM.LogoutView   =   new LogoutView({el:"#container"});

      Backbone.history.start();
    },

    routes : {
      "logout"  : "logout",  
      "picture" : "picture",
      "article" : "article",
      "nav"     : "nav",
      ""            : "nav"
    },
    logout : function(){
      VM.LogoutView.render();
    },
    nav    : function(){
      VM.NavView.render();
    },
    home   : function(){
        
    },
    main   : function(){
    },
    picture: function(){
      VM.PictureView.render();         
    },
    article   : function(){
      VM.ArticleView.render();
    },
  });
  return Router;


});
