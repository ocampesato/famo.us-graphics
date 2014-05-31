define(function(require, exports, module) {
  var Engine = require('famous/core/Engine');
  var Surface = require('famous/core/Surface');
  var Transform = require('famous/core/Transform');
  var StateModifier = require('famous/modifiers/StateModifier');
  
  var mainContext = Engine.createContext();
  
  var basePointX=100, basePointY=100;
  var deltaX=7, rectCount=200;
  var rectWidth=rectCount, rectHeight=rectCount;
  var color="", colors=["#FF0000","#0000FF"];

  for(var x=0; x<rectCount/2; x+=deltaX) {
    color = colors[x%2];

    var surface = new Surface({
        size: [rectCount-2*x, rectCount-2*x],
        properties: {
            left: (basePointX+x)+"px",
            top:  (basePointY+x)+"px",
            backgroundColor: color, 
            lineHeight: (rectCount-x)+"px" 
        }
    });

    var scale1 = new StateModifier({
      origin: [0.2,0.2],
      transform: Transform.scale(2, 0.5, 0.3)
    });

    var rotateZ = new StateModifier({
      origin: [0.2,0.2],
      transform: Transform.rotateZ(x*Math.PI/180)
    });

    mainContext.add(rotateZ).add(scale1).add(surface);
  }
});

