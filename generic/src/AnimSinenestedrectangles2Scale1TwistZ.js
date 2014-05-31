define(function(require, exports, module) {
  var Engine = require('famous/core/Engine');
  var Surface = require('famous/core/Surface');
  var Transform = require('famous/core/Transform');
  var StateModifier = require('famous/modifiers/StateModifier');

  var mainContext = Engine.createContext();
  
  var rectWidth=50, rectHeight=80;
  var basePointX=0, basePointY=200;
  var offsetX=0, offsetY=0, shiftX=150, color=""; 
  var deltaX=1, maxAngle=720, Amp=basePointY/2;
  var colors=["#FF0000","#0000FF",
              "#00FFFF","#FF0000"];

  for(var x=0; x<maxAngle; x+=deltaX) {
    color = colors[x%2];
    offsetX = basePointX+x;
    offsetY = basePointY+Amp*Math.sin(x*Math.PI/180);

    var surface = new Surface({
        size: [rectWidth, rectHeight],
        properties: {
            left: offsetX+"px",
            top:  (2*offsetY)+"px",
            backgroundColor: color
        }
    });

    var stateModifier = new StateModifier();
    mainContext.add(stateModifier).add(surface);

    color = colors[2+(x%2)];
    var surface2 = new Surface({
        size: [rectWidth, rectHeight],
        properties: {
            left: (shiftX+offsetX)+"px",
            top:  (2*offsetY)+"px",
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

