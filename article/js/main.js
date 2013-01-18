require([
  'jquery',
  'underscore',
  'backbone',
  'router',
  'views/home/home',
  'views/header',
  'views/register',
  'models/session',
  'vm',
  'common/error',
  'bootstrap'//,
//  'jmobile'
],function($,_,Backbone,
  Router,
  HomeView,
  HeaderView,
  RegisterView,
  Session,
  VM
  ){

    var self = this;

    VM.HeaderView = new HeaderView({el : "#topbar"});

    VM.HomeView   = new HomeView({ el : "#container" });

    Session.ok(function(u){ 
      VM.Router = new Router();
      VM.Router.navigate("navView");
    });
  //  });

    
     VM.RegisterView = new RegisterView({el : "#container"}); 
  

  //  require(['jmobile'],function(){
//      homeView.render();
  //    registerView.render(); 

  /*
    $(document).on("mobileinit",
      function(){
        $.mobile.linkBindingEnabled = false;
        $.mobile.hashListeningEnabled = false;
        $.mobile.pushStateEnabled = false;
        $.mobile.ajaxEnabled = false;

        $('div[data-role="page"]').live('pagehide', function (event, ui) {
          $(event.currentTarget).empty();
        });
        
      }
      
    );
    */
    


});
