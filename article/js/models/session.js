define([
  'jquery'
],function($){
  var session = {
    
    save : function(email,pwd){
      var self = this;
      $.ajax({
        url : '/user/login',
        type : "post",
        dataType : "json",
        data: {email:email,password:pwd},
        success : function(data){
          self.user = data;
          self.afterok(data);
        },
        error : function(err){
          self.user = undefined;
        }
        
      });
      
    },
    ok    : function(call){
      this.afterok = call;
    },
    start : function(call){
      if(this.user){
        call(this.user);
      }
    }
     


  };

  return session;
});
