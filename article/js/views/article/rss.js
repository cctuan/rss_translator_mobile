/**
 * Rss Content 
 *
 */
define([
  'jquery',
  'underscore',
  'backbone',
  'views/article/genArticle',
  'views/article/genVoice',
  'views/article/genTranslate',
  'text!template/article/rss.html',
  'player'
],function($,_,Backbone,  
  GenArticle , 
  GenVoice ,
  GenTranslate ,
  tpl){


  var MainView = Backbone.View.extend({
    
    initialize : function(){
      this.article  = new GenArticle;
      this.template = _.template(tpl);
    
    },
    events : {
      "click .collapse-rss-title" : "genVoiceContent",
      "click .textcontent" : "playAudio",
      "click .translateit" : "translateit"
    },
    translateit : function(e){
      var content = $(e.currentTarget)
                    .data("content");

      GenTranslate(content,function(data){
        console.log(data);
      });

    },
    playAudio : function(e){
      var content = $(e.currentTarget)
                    .data("content");
      $("#jquery_jplayer_1").jPlayer("setMedia", {
        mp3:decodeURI(content)
      });
      $("#jquery_jplayer_1").jPlayer("play");
   //   document.getElementById("playaudio").play();
    },
    getRss : function(query,callback){

      this.article.getRss(decodeURI(query),function(data){
        callback(data);

      });
    },
    genVoiceContent : function(e){
      var self = this;
      var data = $(e.currentTarget).data("content"),
          contentID = $(e.currentTarget).attr("href");
      
        GenVoice(data,function(text,src){
          var content = $(contentID).find("div>p:first");
          content[0].innerHTML = text;
        });
    },
                      
    render     : function(query){
      var self = this;
      this.getRss(query,function(data){
        $(self.el).html(self.template({contents:data}));
        $("#jquery_jplayer_1").jPlayer({
           
            swfPath: "../js/libs",
            supplied: "mp3",
            wmode: "window"
          });  
                 
      });
    }

  });

  return MainView;
});
