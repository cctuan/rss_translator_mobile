

var express = require("express");

var config    = require('./conf');

var mongoose = require("mongoose");

var passport = require('passport'),
    googleStrategy = require('passport-google-oauth').OAuth2Strategy,
    facebookStrategy = require('passport-facebook').Strategy,
    LocalStrategy = require('passport-local').Strategy;

var user = require("./user");

mongoose.connect(config.db.url,"chew");

var db = mongoose.connection;

db.on('error', function(){
  console.log("Unable to mongoose!");
});

console.log("Trying to connect mongo db!");
db.once('open', start);

function start(){

  var app = express();

  app.configure('development',function(){
    app.use(express.logger());
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.cookieParser());
    app.use(express.session({secret : 'george ya'}));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(express.static(__dirname+'/article'));
  });

  passport.serializeUser(function(thisuser,done){
    if(Array.isArray(thisuser)) thisuser = thisuser[0];
    thisuser.save(function(err){
      done(null,thisuser);
    });
  });

  passport.deserializeUser(function(obj, done){
    user.findById(obj._id,function(err,u){
      done(err,u);
    });
  });


  app.get('/logout',function(req,res){
    req.session.destroy();
    res.redirect('/');
  });





  //google
  passport.use(new googleStrategy({
    clientID : config.google.clientId,
    clientSecret : config.google.clientSecret,
    callbackURL : "http://127.0.0.1:8088/auth/google/callback"
        
  },function(accessToken , refreshToken , profile, done){
    user.updateByAuth(profile,function(err,u){
      return done(err,u);
    });
    }
  ));
  
  app.get('/auth/google',
    passport.authenticate('google', {scope : config.google.scope})
  );
  app.get('/auth/google/callback',
    passport.authenticate('google', {failureRedirect:'/login'}),
    function(req,res){
      res.redirect('/');
    }
  );
  //facebook
  passport.use(new facebookStrategy({
    clientID : config.fb.appId,
    clientSecret : config.fb.appSecret,
    callbackURL : "http://127.0.0.1:8088/auth/facebook/callback"
    },
    function(accessToken , refreshToken , profile, done){
      user.updateByAuth(profile,function(err,u){
        return done(err,u);
      });
    })
  );
  app.get('/auth/facebook',
    passport.authenticate('facebook', {scope : config.fb.scope})
  );
  app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {failureRedirect:'/'}),
    function(req,res){
      res.redirect('/');
    }
  );
  //local
  passport.use('local',new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password'
    },
    function(email , password, done){
      user.find({email: email},function(err,u){
        if (err) {
          return done(err)
        };
        if (u.length==0) {
          return done(null , false , {message : "Unknown User "+ email});
        };
        for(var i in u ){

          if (u[i].get('password')==password) {
            return done(err,u);    
          }
        }
        return done(null,false,{message : "Invalid password"});
        
      });
    })
  );
  
  
  
  app.all('/',function(req,res,next){
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Header","X-Requested-With");
    next();
  });

  function ensureAuthenticated(req,res,next){
    if(req.isAuthenticated()){
      var qId = req.params.userid;

      if(qId == 'me' || qId == req.user._id){
        req.isUseridSelf = true;
      }
      return next();
    }
  }

  function ensureRights(rights){
    return function(req,res,next){
      if(req.user){
        return next();
      }else{

        res.json(401,{error : "not login"});
      }
    };
  }

  app.get("/api/user", 
    ensureAuthenticated, 
    ensureRights(), 
    function(req,res){
      user.find(null,function(err,models){
        if(err) {
          res.json(500,err);
        }
        var r = [];
        _.each(models,function(m){
          r.push(m.toJSON());
        });
        res.json(200,r);
      });

  });

  var saveUser = function(req,res){
    if(req.isUserIdSelf === true){
      user.update(req.params.userid,req.body,
        function(err,u){
          if(err){
            res.json(500,{error:"save fail"});
          }else{
            res.json(200,u.toJSON());
          }
        }
      );
    }else{
      res.json(403,{error : "no rights"});
    }
  };
    
  app.put("/api/user/:userid" , ensureAuthenticated, saveUser);

  app.get("/api/user/:userid",ensureAuthenticated,function(req,res){
    var qId = req.params.userid;
    
    if(req.isUseridSelf === true){
      res.json(200,req.user.toJSON());
    }else{
      res.json(403,{error : "no rights"});

    }

  });
  app.post('/user/login',
    passport.authenticate('local'),function(req,res){
      if(Array.isArray(req.user))req.user = req.user[0];
      res.json(200,req.user.toJSON());
    }
  );
  app.get('/user/login',function(req,res){
    console.log(req.user);
  });
  app.listen(8088);
};


