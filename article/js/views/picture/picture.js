define([
  'jquery',
  'underscore',
  'backbone',
  'libs/html5',
  'text!template/picture/picture.html'
],function($,_,Backbone, HTML5,tpl){
  var MainView = Backbone.View.extend({

    initialize : function(){
      this.media = new HTML5.Media;
      this.template = _.template( tpl );
    },
    events  :  {
      "click #snap" : "takesnap"
    },
    takesnap : function(){
       
      this.media.snap(); 
    },
    render     : function(){
      $.mobile.changePage(
        "#pictureView",
        {changeHash : false}
      );
      $(this.el).html(this.template()).trigger("pagecreate");

      

      this.media.setVideo(document.querySelector('#showyourself'));
      this.media.setCanvas(document.querySelector('#snapshot'));
      this.media.setSnapImg(document.querySelector('#showsnap'));
      this.media.start();
    }

  });

  return MainView;
});
