define([
  'auth/authinfo',
  'libs/google-oauth2'
],function(config,GO2){
 



  (function(d){              
    var js, id = 'facebook-jssdk'; 
    if (d.getElementById(id)) {return;}
    var fbroot = d.createElement("div"); 
    fbroot.id = "fb-root";
    d.body.appendChild(fbroot);

    js = d.createElement('script'); 
    js.id = id; 
    js.async = true;
    js.src = "http://connect.facebook.net/en_US/all.js";
    d.getElementsByTagName('head')[0].appendChild(js);
   }(document)); 
  (function(d){              
    var js, id = 'google-jssdk'; 
    if (d.getElementById(id)) {return;}
    var goroot = d.createElement("div"); 
    goroot.id = "google-root";
    d.body.appendChild(goroot);

    js = d.createElement('script'); 
    js.id = id; 
    js.async = true;
    js.src = "https://apis.google.com/js/client.js";
    d.getElementsByTagName('head')[0].appendChild(js);
   }(document));


  var auth = function(){
    initGoogle();
  //  initFB();
    this.login = function(type){initFB();
      switch(type){
        case "facebook":
          loginFB();
        break;
        case "google" : 
          loginGoogle();   
        break;

      }

    };

  };
  function initGoogle(){
    GO2.init({
      client_id : config.google.clientid,
      origin : 'http://localhost',
      redirect_uri : config.google.redirecturi,
      scope : config.google.scope 
    });
  
    var token = GO2.getAccessToken();
    if(token){
      $.ajax({
        url : "https://www.googleapis.com/oauth2/v1/userinfo?access_token="+token,
        type : "get",
        success : function(data){
          console.log(data);
        }

    });
    }

    
  }

  function loginGoogle(){
    GO2.login();

    /*
    gapi.client.load('plus', 'v1', function() {
      var request = gapi.client.plus.people.get({
        'userId': 'me'
      });
      request.execute(function(resp) {
        console.log(resp); 
      });
    });
    */
  }
  function initFB(){
    FB.init ({
      appId : config.facebook.appid ,
      status: true,
      cookie: true,
      xfbm1 : true,
      oauth : true
    });
    
  }

  function loginFB(){
    FB.login(function(response){
      
      console.log(response);
    },{scope:"email"});
  }
  
  
    
  return auth;
});
