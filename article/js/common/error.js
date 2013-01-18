define([
  'jquery'
],function($){
  
  $(document).ajaxError(function(e,xhr,options){
    if(xhr.status !=  200){
      console.log(xhr.statusText);
    }
    
  });

});
