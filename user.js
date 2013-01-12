var config   = require("./conf"),
    db       = require("./db"),
    mongoose = require("mongoose"),
    _        = require("underscore");

var UserSchema = mongoose.Schema({
  name  : String,
  email : String,
  password : String,
  region : Object,
  addr: String,
  agree: Number,
  gender: Number,
  cdate: { type: Date, default: Date.now },
  lastLogin: { type: Date, default: Date.now },
  bdate: String,
  memberExpiry: Number,
  adminExpiry: Number,
  facebook: Object,
  google: Object,
  rights:[Number]

});

var makeQuery = function( type , profile ){
  switch(type){
    case "facebook":
      return {"facebook.id" : profile.id};
    break;
    case "google"  :
      return {"google.id"   : profile.id};
    break;
  }
};

UserSchema.methods.hasRights = function(n){
  return _.indexOf(this.rights) > -1;
}
var models = {
  user: mongoose.model('User', UserSchema)
};
// obj : user info , type : provider , profile : provider's user info , callback
var updateUser = function(obj, type, profile, callback){
  if(obj == undefined) obj = new models.user();
  /* email */ 


  obj.email = profile.emails[0].value;
  //password set default

  obj.password = "password";
  /* name */
  
  switch(type){
    case "facebook":
      // all
      obj.facebook = profile;
      
      // gender
      var gen;
      switch(profile.gender){
        case "male":
          gen = 1;
        break;
        case "female":
          gen = 0;
        break;
        default: //unset
          gen = -1;
      }
      obj.gender = gen;
    break; // eof fb
    case "google":
      obj.google = profile;
    break;
  }
  obj.lastLogin = Date.now();
  obj.save(function(err){
    _.isFunction( callback ) && callback(err,obj);
  });
};

var updateByAuth= function(profile, callback){
  var type = profile.provider;
  find( makeQuery(type, profile), function(err, models){
    var user;
    if(err){
      _.isFunction( callback ) && callback(err);
    }else if( _.isArray(models) && models.length > 0 ){
      user = models[0];
    }
    updateUser(user, type, profile, callback);
  });
};

var update= function(userid, json, callback){
  var id = userid || json._id, 
      u ;

  var updateFields = function(json){
    var up = {};
    _.each(["name","gender","rights","agree","bdate","region","addr","realName"], function(f){
      if(json[f])
        up[f] = json[f];
    });
    if(json)
    return up;
  };

  if(id){
    models.user.findOneAndUpdate({_id: id}, updateFields(json), function(err, obj){
      if(obj.memberExpiry == undefined){
        // new commer
/*        conf.find("website",function(err, model){
          var d;
          if(err) d = 0;
          d= parseInt( model.data.freeTrail);*/
          models.user.findOneAndUpdate({_id: id}, {memberExpiry: Date.now() + (d* 86400000)}, function(){
            _.isFunction(callback) && callback(err, obj)
          });
  //      });
      }else{
        // normal 
        _.isFunction(callback) && callback(err, obj)
      }
    });
  }else{
    _.isFunction(callback) && callback('user not found')
  }
};
/*
var modifyMembership= function(userid, type, json, callback){
  var id = userid || json._id, u ;
  var updateFields = function(type, json){
    var r = {}, v = parseInt(json.ts);
    switch(type){
      case "member": r.memberExpiry = v; break;
      case "admin":  r.adminExpiry = v; break;
      default: _.isFunction(callback) && callback('type not defined')
    }
    return r;
  }
  if(id){
    models.user.findOneAndUpdate({_id: id}, updateFields(type, json), function(err, obj){
      _.isFunction(callback) && callback(err, obj)
    });
  }else{
    _.isFunction(callback) && callback('user not found')
  }
};
*/

//query can be {somefield : somevalue} 
var find= function( query , callback){
  models.user.find( query || {},function(err,models){
    _.isFunction( callback ) && callback(err,models);
  });
};

var findById= function( id , callback){
  models.user.findById(  id , function(err,doc){
    _.isFunction( callback ) && callback(err,doc);
  });
};

//exports.modifyMembership= modifyMembership;
exports.findById = findById;
exports.update = update;
exports.updateByAuth = updateByAuth;
exports.find = find;
exports.models= models;


