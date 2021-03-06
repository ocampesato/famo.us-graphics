define(function(require, exports, module) {
  var Engine = require('famous/core/Engine');
  var Surface = require('famous/core/Surface');
  
  var mainContext = Engine.createContext();
  
  var deltaX=7, rectCount=200;
  var rectWidth=rectCount, rectHeight=rectCount;
  var color="", colors=["#FF0000","#0000FF"];

  for(var x=0; x<rectCount/2; x+=deltaX) {
    color = colors[x%2];

    var surface = new Surface({
        size: [rectCount-x, rectCount-x],
        properties: {
            left: "100px",
            top:  "100px",
            backgroundColor: color, 
            lineHeight: (rectCount-x)+"px" 
        }
    });

    mainContext.add(surface);
  }
});

