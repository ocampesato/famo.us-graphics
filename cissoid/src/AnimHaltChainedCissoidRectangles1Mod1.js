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
  var sine        = 0;
  var cosine      = 0;
  var factor      = 1;
  var spiralCount = 4;
  var Constant    = 200;
  var angle       = 0;
  var deltaAngle  = 2;
  var maxAngle    = 721;

  var rectWidth=60, rectHeight=60;
  var offsetX=0, offsetY=0, index=0;
  var color="", colors=["#FF0000","#0000FF","#FFFF00","#FF00FF"];

  for(angle=0; angle<maxAngle; angle+=deltaAngle) {
    sine     = Math.sin(factor*angle*Math.PI/180);
    cosine   = Math.cos(factor*angle*Math.PI/180);
    radius   = Constant*sine*sine/cosine;
 
    offsetX  = radius*Math.cos(angle*Math.PI/180);
    offsetY  = radius*Math.sin(angle*Math.PI/180);
    currentX = basePointX+offsetX;
    currentY = basePointY-offsetY;

    // alternate between red and blue
    index = Math.floor(angle/deltaAngle) % colors.length;
    color = colors[index%2];

    var surface = new Surface({
        size: [(angle%rectWidth), (angle%rectHeight)],
        properties: {
            left: currentX+"px",
            top:  currentY+"px",
            backgroundColor: color
        }
    });

    var stateModifier = new StateModifier();
    mainContext.add(stateModifier).add(surface);

    stateModifier.setTransform(
      Transform.translate(100, 100, 0),
      { duration : 5000, curve: 'easeInOut' }
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

