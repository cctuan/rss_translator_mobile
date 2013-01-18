define([
  'jquery',
  'underscore'
],function(){
 
  var baseUrl = "http://www.google.com/dictionary/json?callback=dict_api.callbacks.id100&q={query}&sl=en&tl=en";


  var googleTransUrl = "http://translate.google.com.tw/translate_a/t?client=t&text={pattern}&hl=zh-TW&sl=en&tl=zh-TW&ie=UTF-8&oe=UTF-8&multires=1&otf=2&ssel=3&tsel=3&sc=1"

  var googleVoice = "http://translate.google.com.tw/translate_tts?ie=UTF-8&q={pattern}&tl={language}&total=1&idx=0&textlen={length}&prev=input";

  var langMap = {
    en : "en",
    cn : "zh-CN"
  };



  var GenVoice = function(content,callback){
    
    var sentences = content.split(/\.|,/);
    
    getVoice(sentences,function(datum){
      
        callback(datum);  
    });

    console.log(sentences);
  };

  function getVoice(sents,callback){
    var html = "";
    _.each(sents,function(sent){
      var len = sent.length;
      html += ("<span class='textcontent'>"
        +sent
        +"."
        +"<audio src='"
        +googleVoice
          .replace("{pattern}",encodeURI(sent))
          .replace("{length}",len)
          .replace("{language}",langMap.en)
        +"'/></span>");
    });
    callback(html);

  }

  return GenVoice;

});
