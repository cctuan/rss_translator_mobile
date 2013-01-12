require([
  'jquery',
  'underscore',
  'backbone',
  'router',
  'views/home/home',
  'models/session',
],function($,_,Backbone,
  Router,
  HomeView,
  Session
  ){

    var self = this;
    var homeView  =   new HomeView(); 

   
    require(['jmobile'],function(){
      Session.ok(function(u){ 
        self.router = new Router();
      });
    });
    $(document).on("mobileinit",
      function(){
   //     $.mobile.linkBindingEnabled = false;
   //     $.mobile.hashListeningEnabled = false;
        $.mobile.pushStateEnabled = false;
    //    $.mobile.ajaxEnabled = false;

        $('div[data-role="page"]').live('pagehide', function (event, ui) {
          $(event.currentTarget).empty();
        });
        
      }
      
    );

    


});
