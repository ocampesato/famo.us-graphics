define(function(require, exports, module) {
  var Engine = require('famous/core/Engine');
  var Surface = require('famous/core/Surface');
  var Transform = require('famous/core/Transform');
  var StateModifier = require('famous/modifiers/StateModifier');

  var mainContext = Engine.createContext();
  
  var rectWidth=50, rectHeight=50;
  var basePointX=100, basePointY=150;
  var offsetX=0, offsetY=0, maxHeight=100;
  var deltaX=7, rectCount=500, Amp=150;
  var color="", colors=["#FF0000","#0000FF"];

  for(var x=0; x<rectCount; x+=deltaX) {
    color = colors[x%2];
    offsetX = basePointX+x;
    offsetY = basePointY+(x%maxHeight);

    var surface = new Surface({
        size: [rectWidth, rectHeight],
        properties: {
            left: offsetX+"px",
            top:  offsetY+"px",
            backgroundColor: color
        }
    });

    var rotateZ45 = new StateModifier({
      origin: [0.2,0.2],
      transform: Transform.rotateZ(Math.PI/4)
    });

    mainContext.add(rotateZ45).add(surface);
  }
});

