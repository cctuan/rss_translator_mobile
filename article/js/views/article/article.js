/**
 * rssViewer 
 *
 */
define([
  'jquery',
  'underscore',
  'backbone',
  'views/article/genArticle',
  'views/article/rss',
  'text!template/article/article.html'
],function($,_,Backbone, GenArticle , RssView ,tpl){


  var MainView = Backbone.View.extend({
    
    initialize : function(){
      this.article = new GenArticle;
      this.template = _.template(tpl);
    
    },
    events : {
  //    "click .article-li" : "enterRss"
    },
    enterRss : function(e){
      var self = this;
      var src  = $(e.currentTarget).data("rss");
      this.article.getRss(src , function(data){
        self.rssView.data = data;
        self.rssView.render(); 
      });

    },
    getArticleSrcs : function(callback){
      callback(this.article.getUrls());
    },

    render     : function(){
      var self = this;
      this.getArticleSrcs(function(srcs){  
    
        $(self.el).html(self.template({srcs:srcs}));
      });
    }

  });

  return MainView;
});
