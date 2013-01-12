var conf = require('./conf'),
    dbUrl = conf.db.url,
    mongoose = require('mongoose'), // mongoose
    MongoClient = require('mongodb').MongoClient; // mongodb native driver 

/* mongoose */
exports.connect = function(callback){
  mongoose.connect(dbUrl)
  var db = mongoose.connection;
  db.on('error', function(){
  
  });
  db.once('open', function () {
    // console.log("mongoose connected");
    (typeof(callback)==="function") && callback();
  });
}
exports.close = function(){
  mongoose.disconnect();
}
