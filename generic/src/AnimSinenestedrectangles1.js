define(function(require, exports, module) {
  var Engine = require('famous/core/Engine');
  var Surface = require('famous/core/Surface');
  var Transform = require('famous/core/Transform');
  var StateModifier = require('famous/modifiers/StateModifier');

  var mainContext = Engine.createContext();
  
  var rectWidth=50, rectHeight=80;
  var basePointX=50, basePointY=150;
  var offsetX=0, offsetY=0;
  var deltaX=1, maxAngle=720, Amp=basePointY-30;
  var color="", colors=["#FF0000","#0000FF"];

  for(var x=0; x<maxAngle; x+=deltaX) {
    color = colors[x%2];
    offsetX = basePointX+x;
    offsetY = basePointY+Amp*Math.sin(x*Math.PI/180);

    var surface = new Surface({
        size: [rectWidth, rectHeight],
        properties: {
            left: offsetX+"px",
            top:  offsetY+"px",
            backgroundColor: color
        }
    });

    var stateModifier = new StateModifier();
    mainContext.add(stateModifier).add(surface);

    stateModifier.setTransform(
      Transform.translate(100, 100, 0),
      { duration : 5000, curve: 'easeInOut' }
    );
  }
});

