define(function(require, exports, module) {
  var Easing = require('famous/transitions/Easing');
  var Engine = require('famous/core/Engine');
  var Surface = require('famous/core/Surface');
  var Transform = require('famous/core/Transform');
  var StateModifier = require('famous/modifiers/StateModifier');

  var mainContext = Engine.createContext();
  
  var basePointX  = 200;
  var basePointY  = 200;
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
  var color="", colors=["#FF0000","#0000FF","#FF00FF","#FFFF00"];

  for(angle=1; angle<maxAngle; angle+=deltaAngle) {
    radius = Constant*
               Math.sin(angle*Math.PI/180)/angle;
 
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

    var stateModifier = new StateModifier();
    mainContext.add(stateModifier).add(surface);

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

