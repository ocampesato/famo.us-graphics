define(function(require, exports, module) {
  var Engine = require('famous/core/Engine');
  var Surface = require('famous/core/Surface');
  var Transform = require('famous/core/Transform');
  var StateModifier = require('famous/modifiers/StateModifier');
  
  var mainContext = Engine.createContext();
  
  var rectWidth=50, rectHeight=50, sign=1,topY=0;
  var basePointX=200, basePointY=250;
  var offsetX=0, offsetY=0, maxHeight=100;
  var deltaX=7, rectCount=500, Amp=150;
  var color="", colors=["#FF0000","#0000FF"];

  for(var x=0; x<rectCount; x+=deltaX) {
    color = colors[x%2];
    offsetX = basePointX+x;
    offsetY = basePointY+(x%maxHeight);
    sign = Math.floor(x/maxHeight)%2;

    if(sign == 0) {
      topY = offsetY;
    } else {
      topY = basePointY+maxHeight-(x%maxHeight);
    } 

    var surface = new Surface({
        size: [rectWidth, rectHeight],
        properties: {
            left: offsetX+"px",
            top:  offsetY+"px",
            backgroundColor: color
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

    var stateModifier = new StateModifier();
    mainContext.add(stateModifier).add(rotateZ).add(scale1).add(surface);

    stateModifier.setTransform(
      Transform.translate(100, 100, 0),
      { duration : 5000, curve: 'easeInOut' }
    );
  }
});

