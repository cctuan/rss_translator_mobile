define([
  'jquery'
],function($){
  var session = {
    leave : function(callback){
      $.ajax({
        url  : '/user/logout',
        type : "get",
        success : function(u){          
          console.log(u);
          callback(u);

        },
      });

    },
    newUser : function(obj){
      var self = this;
      $.ajax({
        url : '/user/register',
        type : "post",
        dataType :"json",
        data : {
          email : obj.email,
          password : obj.password,
          username : obj.username

        },
        success: function(data){
          self.user = data;
          self.afterok(data);
        }

      });

    },
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
