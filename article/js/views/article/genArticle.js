/**
 *  Get Rss tweets from default Rss Srcs
 *  Add Rss link
 *  remove Rss link
 *  Get Rss list
 *  
 */

define([
  'jquery',
  'underscore',
  'goog!feeds,1'
],function($,_){
  var feedsloader = function(){
    
    var defaultRssSrcs = {
      "CNN Top Story"   : "http://rss.cnn.com/rss/edition.rss" ,
      "CNN World News"  : "http://rss.cnn.com/rss/edition_world.rss",
      "CNN Asia News"   : "http://rss.cnn.com/rss/edition_asia.rss"

    };
    
    var URLs = {},
        config = {};
  
    URLs = $.extend(URLs,defaultRssSrcs);    

    this.removeUrl = function(name){
      delete URLs[name];
      return true;
    };

    this.addUrl = function(url){//url = {type , src}
      URLs[url.type] = url.src;
      return true;
    };

    this.getUrls = function(){
      return URLs;

    };
    this.getRss = function(name,callback){
      getRSS(URLs[name],callback); 
    };

    this.setConfig   = function(conf){
      config = conf;
    };

    function getRSS(url,callback){
      var feed =  new google.feeds.Feed(url);

      feed.includeHistoricalEntries();
      feed.setNumEntries(config.numentries||25); 
      feed.load(function(data){
        callback(dataparser(data));   
      });
    }
    function dataparser(datum){
      var result = [];
      _.each(datum.feed.entries,function(con){
        con.content = con.content
          .replace(/"/g,"")
          .replace(/'/g,"")
          .replace(/<.*>/g,"");
        result.push(con);

      });
      return result;
    
    }

  };
  
  return feedsloader;
});
