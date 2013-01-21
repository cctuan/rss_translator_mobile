define([
  'jquery',
  'backbone',
  'views/home/home',
  'views/picture/picture',
  'views/article/article',
  'views/nav/main',
  'views/article/rss',
  'views/logout',
  'vm'
],function($,Backbone,
  HomeView ,
  PictureView,
  ArticleView,
  NavView,
  RssView,
  LogoutView,
  VM
  ){
  var Router = Backbone.Router.extend({
    initialize : function() {
     
      VM.HeaderView.switchLoginout(true);

      VM.NavView      =   new NavView({el : "#container"});
      VM.PictureView  =   new PictureView({el : "#container"});
      VM.ArticleView  =   new ArticleView({el:"#container"});
      VM.RssView      =   new RssView({el :"#container"});
      VM.LogoutView   =   new LogoutView({el:"#container"});

      Backbone.history.start();
    },

    routes : {
      "logout"         : "logout",  
      "picture"        : "picture",
      "article"        : "article",
      "rss/:query"     : "rss",
      "nav"            : "nav",
      ""               : "nav"
    },
    rss    : function(query){
      VM.RssView.render(query);

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
