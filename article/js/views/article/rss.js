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
  'text!template/article/rss.html'
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

      var parseResult = $(e.currentTarget)
                        .parent()
                        .find(".translate_result");

      GenTranslate(content,function(data){
        parseResult.text(data);
      });

    },
    playAudio : function(e){
      var content = $(e.currentTarget)
                    .data("content");


      $(e.currentTarget).addClass("played");

      $("#playaudio").attr("src",decodeURI(content));

   //   document.getElementById("playaudio").play();
    },
    getRss : function(query,callback){

      this.article.getRss(decodeURI(query),function(data){
        callback(data);

      });
    },
    genVoiceContent : function(e){
      var targ = $(e.currentTarget);

      var self = this;
      if(targ.data("stat")=="closed"){
        targ.data("stat","opened");
        var data = $(e.currentTarget).data("content"),
            contentID = $(e.currentTarget).attr("href");
        
        GenVoice(data,function(text,src){
          var content = $(contentID).find("div>p:first");
          content[0].innerHTML = text;

          content.find("span:first").trigger("click");
        });
      }else{
        targ.data("stat","closed");
      }
    },
    render     : function(query){
      var self = this;
      this.getRss(query,function(data){
        $(self.el).html(self.template({contents:data}));
      });
    }

  });

  return MainView;
});
