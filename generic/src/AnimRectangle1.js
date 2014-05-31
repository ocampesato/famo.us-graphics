define(function(require, exports, module) {
  var Engine = require('famous/core/Engine');
  var Surface = require('famous/core/Surface');
  var StateModifier = require('famous/modifiers/StateModifier');
  var Transform = require('famous/core/Transform');
  
  var mainContext = Engine.createContext();
  
  var firstSurface = new Surface({
    size: [100, 50],
    properties: {
      backgroundColor: '#FF0000'
    }
  });
  
  var stateModifier = new StateModifier();
  mainContext.add(stateModifier).add(firstSurface);

  var secondSurface = new Surface({
    size: [100, 200],
    properties: {
      backgroundColor: '#0000FF',
      top: '50px',
      left: '250px'
    }
  });
  
  mainContext.add(stateModifier).add(secondSurface);

  stateModifier.setTransform(
    Transform.translate(100, 100, 0),
    { duration : 5000, curve: 'easeInOut' }
  );
});

