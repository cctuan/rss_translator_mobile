define([
  'jquery',
  'underscore',
  'backbone',
  'moment'
],function($,_,Backbone){
  var User = Backbone.Model.extend({
    url: function(){
      return "/api/user/" + (this.id ? this.id : "me");
    },
    isAuthority: function(){
      var me = this.get("memberExpiry"),
        memberExpiry = moment( me ),
        now = moment( new Date() );
      if(me != undefined && memberExpiry.diff(now) > 0 )
        return true;
      return false;
    }
  });

  return User;
});
