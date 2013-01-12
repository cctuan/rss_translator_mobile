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
    moment : "libs/moment.min"
  },
  shim:{
    underscore:{
      deps:['jquery']
    },
    backbone:{
      deps:['jquery','underscore']
    },
    jmobile:{
      deps:['jquery']
    },
  }
});
