define(function(require, exports, module) {
  var Easing = require('famous/transitions/Easing');
  var Engine = require('famous/core/Engine');
  var Surface = require('famous/core/Surface');
  var Transform = require('famous/core/Transform');
  var StateModifier = require('famous/modifiers/StateModifier');

  var mainContext = Engine.createContext();
  
  var basePointX  = 100;
  var basePointY  = 300;
  var currentX    = 0;
  var currentY    = 0;
  var offsetX     = 0;
  var offsetY     = 0;
  var radius      = 0;
  var smallRadius = 80;
  var Constant1   = 120;
  var Constant2   = 80;
  var spiralCount = 4;
  var Constant    = 0.25;
  var angle       = 0;
  var deltaAngle  = 2;
  var maxAngle    = 721;
  var stripWidth  = 40;
  var stripCount  = Math.floor(maxAngle/stripWidth);
  var currStrip   = 0;

  var rectWidth=80, rectHeight=80;
  var offsetX=0, offsetY=0, index=0;
  var factor=0, factors=[1.0, 0.4];
  var color="", colors=["#FF0000","#0000FF","#FF00FF","#FFFF00"];

  for(angle=0; angle<maxAngle; angle+=deltaAngle) {
    radius   = Constant1+Constant2/
                       Math.cos(angle*Math.PI/180);
 
    offsetX  = radius*Math.cos(angle*Math.PI/180);
    offsetY  = radius*Math.sin(angle*Math.PI/180);
    currentX = basePointX+offsetX;
    currentY = basePointY-offsetY;

    // alternate between red and blue
    index = Math.floor(angle/deltaAngle) % colors.length;
    color = colors[index%2];

    currStrip = Math.floor(angle/deltaAngle/stripWidth);
    factor = factors[currStrip % 2];

    var surface = new Surface({
        size: [factor*rectWidth, factor*rectHeight],
        properties: {
            left: currentX+"px",
            top:  currentY+"px",
            backgroundColor: color
        }
    });

    var scale1 = new StateModifier({
      origin: [0.2,0.2],
      transform: Transform.scale(2, 0.5, 0.3)
    });

    var scale1 = new StateModifier({
      origin: [0.2,0.2],
      transform: Transform.scale(2, 0.5, 0.3)
    });

    var rotateZ45 = new StateModifier({
      origin: [0.2,0.2],
      transform: Transform.rotateZ(-Math.PI/4)
    });

    var stateModifier = new StateModifier();
    mainContext.add(stateModifier).add(rotateZ45).add(scale1).add(surface);

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

