define(function(require, exports, module) {
  var Easing = require('famous/transitions/Easing');
  var Engine = require('famous/core/Engine');
  var Surface = require('famous/core/Surface');
  var Transform = require('famous/core/Transform');
  var StateModifier = require('famous/modifiers/StateModifier');

  var mainContext = Engine.createContext();
  
  var basePointX  = 400;
  var basePointY  = 300;
  var currentX    = 0;
  var currentY    = 0;
  var offsetX     = 0;
  var offsetY     = 0;
  var radius      = 0;
  var spiralCount = 4;
  var Constant    = 20000;
  var angle       = 0;
  var deltaAngle  = 2;
  var maxAngle    = 721;
  var stripWidth  = 40;
  var stripCount  = Math.floor(maxAngle/stripWidth);
  var currStrip   = 0;

  var rectWidth=80, rectHeight=80;
  var offsetX=0, offsetY=0, index=0;
  var factor=0, factors=[1.0, 0.4];
  var duration=0, durations=[8000,6500,7000,7500];
  var height=0, heights=[200,204,202,196];
  var color="",colors=["#FF4400","#FF0F0F","#FF00FF","#0000FF"];

  var easingTypes=[Easing.inQuad,Easing.outQuad,Easing.inOutQuad,Easing.inCubic,Easing.outCubic,Easing.inOutCubic,Easing.inQuart,Easing.outQuart,Easing.inOutQuart,Easing.inQuint,Easing.outQuint,Easing.inOutQuint,Easing.inSine,Easing.outSine,Easing.inOutSine,Easing.inExpo,Easing.outExpo,Easing.inOutExpo,Easing.inCirc,Easing.outCirc,Easing.inOutCirc,Easing.inElastic,Easing.outElastic,Easing.inOutElastic,Easing.inBack,Easing.outBack,Easing.inOutBack,Easing.inBounce,Easing.outBounce,Easing.inOutBounce];

  for(angle=1; angle<maxAngle; angle+=deltaAngle) {
    radius = Constant*
               Math.sin(angle*Math.PI/180)/angle;
 
    offsetX  = radius*Math.cos(angle*Math.PI/180);
    offsetY  = radius*Math.sin(angle*Math.PI/180);
    currentX = basePointX+offsetX;
    currentY = basePointY-offsetY;

    // alternate between red and blue
    index = Math.floor(angle/deltaAngle) % colors.length;
    color = colors[index];

    currStrip = Math.floor(angle/deltaAngle/stripWidth);
    factor = factors[currStrip % 2];

    var surface = new Surface({
        size: [factor*rectWidth, factor*rectHeight],
        properties: {
            left: currentX+"px",
            top:  currentY+"px",
            backgroundColor: color,
            borderRadius:(angle%50)+'%'
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

    var rotateZ = new StateModifier({
      origin: [0.2,0.2],
      transform: Transform.rotateZ(angle*Math.PI/180)
    });

    var stateModifier = new StateModifier({
      origin: [0.4, 0]
    });
 
    mainContext.add(stateModifier).add(rotateZ).add(scale1).add(surface);

    duration = durations[index];
    height = heights[index];
    easing = easingTypes[index];

    stateModifier.setTransform(
      Transform.translate(height, height, 0),
      { duration : duration, curve: easing}
    );
 
    stateModifier.setTransform(
      Transform.rotateY(angle*Math.PI/180), 
      { duration : duration, curve: easing}
    );
 
    stateModifier.setTransform(
      Transform.scale(1.0/(1.0+height), 1.0/(1.0+height), 1.0/(1.0+height)),
      { duration : duration, curve: easing}
    );
  }
});

