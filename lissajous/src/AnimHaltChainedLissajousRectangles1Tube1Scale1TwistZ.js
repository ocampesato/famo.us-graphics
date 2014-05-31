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
  var Constant    = 0.25;
  var A           = 200;
  var B           = 2;
  var C           = 100;
  var D           = 5;
  var smallRadius = 20;
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
    offsetX  = A*Math.sin(B*angle*Math.PI/180);
    offsetY  = C*Math.cos(D*angle*Math.PI/180);
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

    var rotateZ = new StateModifier({
      origin: [0.2,0.2],
      transform: Transform.rotateZ(angle*Math.PI/180)
    });

    var stateModifier = new StateModifier();
    mainContext.add(stateModifier).add(rotateZ).add(scale1).add(surface);

    stateModifier.setTransform(
      Transform.translate(0, 400, 0),
      { duration : 8000, curve: 'linear' }
    );

    surface.on('click', function() {
      stateModifier.halt();
      surface.setContent('halted');
      stateModifier.setTransform(
        Transform.translate(0, 400, 0),
        { duration : 400, curve: Easing.outBounce }
      );
    });
  }
});

