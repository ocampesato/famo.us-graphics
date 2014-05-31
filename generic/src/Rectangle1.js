define(function(require, exports, module) {
  var Engine = require('famous/core/Engine');
  var Surface = require('famous/core/Surface');
  
  var mainContext = Engine.createContext();
  
  var firstSurface = new Surface({
    size: [100, 50],
    properties: {
      backgroundColor: '#FF0000'
    }
  });
  
  mainContext.add(firstSurface);

  var secondSurface = new Surface({
    size: [100, 200],
    properties: {
      backgroundColor: '#0000FF',
      top: '50px',
      left: '250px'
    }
  });
  
  mainContext.add(secondSurface);
});

