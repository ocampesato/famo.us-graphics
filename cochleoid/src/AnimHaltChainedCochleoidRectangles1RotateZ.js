define(function(require, exports, module) {
  var Easing = require('famous/transitions/Easing');
  var Engine = require('famous/core/Engine');
  var Surface = require('famous/core/Surface');
  var Transform = require('famous/core/Transform');
  var StateModifier = require('famous/modifiers/StateModifier');

  var mainContext = Engine.createContext();
  
  var basePointX  = 20;
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

  var rectWidth=60, rectHeight=60;
  var offsetX=0, offsetY=0, index=0;
  var color="", colors=["#FF0000","#FFFF00","#FF00FF","#0000FF"];

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
      Transform.translate(0, 300, 0),
      { duration : 1000, curve: Easing.inExpo }
    );

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

