define([
 
],function(){
  
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

  


  var init = function(){ 
  console.log(window.location);
  FB.init ({
      appId : "286895458099731" ,
      status: true,
      cookie: true,
      xfbm1 : true,
      oauth : true
    });
    
  };
    
  var login = function(){
    console.log('yyyy');
      FB.login(function(response){
      
        console.log(response);
      },{scope:"email"});

    };
  return {
    init  : init,
    login : login
  };
});
