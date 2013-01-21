require.config({
deps:['main'],    
baseUrl: '/js/',
  paths:{
  //  backbone:'libs/backbone',
    jquery:'libs/jquery-1.8.3',
    jmobile:'libs/jquery.mobile-1.2.0',
    
    backbone : 'libs/backbone',
    underscore : 'libs/lodash.min',
    text:'libs/text',
    template:'../template',
    async :  "libs/async",
    goog  :  "libs/goog",
    propertyParser : "libs/propertyParser",
    moment : "libs/moment.min",
    bootstrap : "libs/bootstrap",
    vm : "views/vm",
    player : "libs/jquery.jplayer.min" 
  },
  shim:{
    goog : {
      deps : ['async','propertyParser']
    },
    underscore:{
      deps:['jquery']
    },
    backbone:{
      deps:['jquery','underscore']
    },
//    jmobile:{
 //     deps:['jquery']
//    },
  }
});
