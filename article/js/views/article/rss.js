define([
  'jquery',
  'underscore',
  'backbone',
  'views/article/genVoice',
  'text!template/article/rss.html'
],function($,_,Backbone,  GenVoice ,tpl){


  var MainView = Backbone.View.extend({
    
    initialize : function(){
      this.template = _.template(tpl);
    
    },
    events : {
      "click .rsscontent" : "genVoiceContent"
    },
    genVoiceContent : function(e){
      var data = $(e.currentTarget).data("art");
      
        GenVoice(data,function(text){
          $(e.target).find(".fillup").html(text);

        });
      $(e.currentTarget).unbind("click",this.genVoiceContent);
    },
    render     : function(){
      var self = this;
    
      $(self.el).html(self.template({contents:this.data}));

    }

  });

  return MainView;
});
