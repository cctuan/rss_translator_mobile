define([

],function(){
  var getUserMedia = 
     window.navigator.getUserMedia || 
     window.navigator.webkitGetUserMedia ||
     window.navigator.mozGetUserMedia || 
     window.navigator.msGetUserMedia;

  var Media = function(){
    
    var video,
        canvas,
        snapshot;
    
    this.setVideo = function(v){
      video = v;
    };
    this.setCanvas = function(c){
      canvas = c;
    };
    this.setSnapImg = function(m){
      snapshot = m;
    };
    this.start = function(){
      window.navigator.webkitGetUserMedia({video: true, audio: true}, function(localMediaStream) {
        
        video.src = window.URL.createObjectURL(localMediaStream);
        video.onloadedmetadata = function(e) {
        };
      }, onFailSoHard);

    };
    this.snap = function(){
      var context = canvas.getContext('2d');

      context.drawImage(video, 0, 0);
      snapshot.src = canvas.toDataURL('image/webp');
      snapshot.style.display = "block";
      canvas.style.display = "none";
      video.style.display = "none";
    };
    function onFailSoHard(){

    }

  };

  return {
    Media : Media
  };
});
