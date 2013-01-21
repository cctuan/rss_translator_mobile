/**
 * Split text and pass each sentence to google translator 
 *
 */
define([
  'jquery',
  'underscore'
],function(){
 
  var baseUrl = "http://www.google.com/dictionary/json?callback=dict_api.callbacks.id100&q={query}&sl=en&tl=en";


  var googleTransUrl = "http://translate.google.com.tw/translate_a/t?client=t&text={pattern}&hl=zh-TW&sl=en&tl=zh-TW&ie=UTF-8&oe=UTF-8"

  var googleVoice = "http://translate.google.com.tw/translate_tts?ie=UTF-8&q={pattern}&tl={language}&total=1&prev=input";

  var langMap = {
    en : "en",
    cn : "zh-CN"
  };


  var GenVoice = function(content,callback){
    
    var sen = decodeURI(content),
        withcommas = sen.split(",");
    
    var sentences = [];
    
    _.each(withcommas,function(comma,i){
      
      var quos = comma.split(".");  
      _.each(quos,function(quo,j){
        sentences.push(quo);
        quos[j+1]!==undefined && sentences.push(".");
        
      });
      withcommas[i+1]!==undefined && sentences.push(",");

    });

//    var sentences = [decodeURI(content)];   
    getVoice(sentences,function(datum){
      
        callback(datum);  
    });

    console.log(sentences);
  };

  function getVoice(sents,callback){
    var html = "";
    _.each(sents,function(sent){
      if(sent!=","||sent!="."){
        var srrc=  googleVoice
            .replace("{pattern}",encodeURI(sent))
            .replace("{length}",len)
            .replace("{language}",langMap.en);
        var len = sent.length;
        html += ("<span data-content='"+encodeURI(srrc)+"'  class='textcontent'>"
          +sent
          +"</span>");

      }
    });
    callback(html/* , googleVoice
            .replace("{pattern}",encodeURI(sent))
            .replace("{length}",len)
            .replace("{language}",langMap.en)*/);

  }

  return GenVoice;

});
