define(function(require, exports, module) {
  var Easing = require('famous/transitions/Easing');
  var Engine = require('famous/core/Engine');
  var Surface = require('famous/core/Surface');
  var Transform = require('famous/core/Transform');
  var StateModifier = require('famous/modifiers/StateModifier');

  var mainContext = Engine.createContext();
  
  var basePointX  = 300;
  var basePointY  = 20;
  var currentX    = 0;
  var currentY    = 0;
  var offsetX     = 0;
  var offsetY     = 0;
  var radius      = 0;
  var spiralCount = 4;
  var Constant    = 200;
  var angle       = 0;
  var deltaAngle  = 2;
  var maxAngle    = 721;

  var rectWidth=60, rectHeight=60;
  var offsetX=0, offsetY=0, index=0;
  var color="", colors=["#FF0000","#FFFF00","#FF00FF","#0000FF"];

  for(angle=1; angle<maxAngle; angle+=deltaAngle) {
    radius   = Constant*Constant/angle;
    offsetX  = radius*Math.cos(angle*Math.PI/180);
    offsetY  = radius*Math.sin(angle*Math.PI/180);
    currentX = basePointX+offsetX;
    currentY = basePointY-offsetY;

    // alternate between red and blue
    index = Math.floor(angle/deltaAngle) % colors.length;
    color = colors[index%2];

    var surface = new Surface({
        size: [rectWidth, rectHeight],
        properties: {
            left: currentX+"px",
            top:  currentY+"px",
            backgroundColor: color
        }
    });

    var rotateZ45 = new StateModifier({
      origin: [0.2,0.2],
      transform: Transform.rotateZ(Math.PI/4)
    });

    var stateModifier = new StateModifier();
    mainContext.add(stateModifier).add(rotateZ45).add(surface);

    stateModifier.setTransform(
      Transform.translate(-100, -100, 0), 
      { duration : 2000, curve: Easing.inOutCubic}
    );

    stateModifier.setTransform(
      Transform.scale(1, 2),
      { duration : 2000, curve: Easing.outElastic}
    );

    stateModifier.setTransform(
      Transform.scale(2, 0.5),
      { duration : 2000, curve: Easing.outElastic}
    );

    stateModifier.setTransform(
      Transform.skew(0,90,0),
      { duration : 2000, curve: Easing.inOutElastic}
    );
  }
});
