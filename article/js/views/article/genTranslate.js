/**
 * Split text and pass each sentence to google translator 
 *
 */
define([
  'jquery',
  'underscore'
],function($,_){
 
  var baseUrl = "http://www.google.com/dictionary/json?callback=dict_api.callbacks.id100&q={query}&sl=en&tl=en";


  var googleTransUrl = "http://translate.google.com.tw/translate_a/t?client=t&text={pattern}&hl=zh-TW&sl=en&tl=zh-TW&ie=UTF-8&oe=UTF-8&callback=?"


  var langMap = {
    en : "en",
    cn : "zh-CN"
  };


  var GenTranslate = function(content,callback){
    
    var sen = content;
    
//    var sentences = [decodeURI(content)];   
    getTranslate(sen,function(datum){
      
        callback(datum);  
    });

  };

  function getTranslate(target,callback){
    var url = googleTransUrl
              .replace("{pattern}",target);
    $.get('http://translate.google.cn/translate_a/t',
      {
        client:'t',
        text:target,
        hl:'en',
        sl:'en',
        tl:'zh-CN',
        ie:'UTF-8',
        oe:'UTF-8',
        multires:1,
        otf:1,
        pc:1,
        ssel:5,
        tsel:5
      },
      function(data){
        console.log(data);
      });/*
    $.ajax({
      url : url,
      crossDomain : true,
      jsonpCallback: function(data,xhr,d){
        console.log(data);
        console.log(xhr);
      },
      dataType : 'jsonp',
      success : function(data){
        callback(data);
      }
    });*/

  }

  return GenTranslate;

});
