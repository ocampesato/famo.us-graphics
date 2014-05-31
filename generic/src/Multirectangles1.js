define(function(require, exports, module) {
  var Engine = require('famous/core/Engine');
  var Surface = require('famous/core/Surface');
  
  var mainContext = Engine.createContext();
  
  var deltaX=7, rectCount=200;
  var rectWidth=rectCount, rectHeight=rectCount;
  var color="", colors=["#FF0000","#0000FF"];

  for(var x=0; x<rectCount; x+=deltaX) {
    color = colors[x%colors.length];

    var surface = new Surface({
        size: [100, 100],
        properties: {
          backgroundColor: color, 
          left: x+"px",
          top:  x+"px"
        }
    });

    mainContext.add(surface);
  }
});

