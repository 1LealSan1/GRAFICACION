var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var x1, y1, x2, y2

function showCoords(event) {
  var x = event.clientX;
  var y = event.clientY;

  if(x1==null){
    x1 = x
  }else if(x2==null){
    x2 = x
  }

  if(y1==null){
    y1 = y
  }else if(y2==null){
    y2 = y
  }

  var coor = "X: " + x + ", Y: " + y;
  document.getElementById("demo").innerHTML = coor;

  if(x1 != null && x2 != null && y1 != null && y2 != null){
    console.log(x1, y1, x2, y2)
    DDA(x1, y1, x2, y2)
    x1 = null
    x2 = null
    y1 = null
    y2 = null
  }
}

function clearCoor() {
  document.getElementById("demo").innerHTML = "";
}

// DDA function
function DDA(x1, y1, x2, y2) {
    var dx = x2 - x1;
    var dy = y2 - y1;
    var steps = Math.abs(dx) > Math.abs(dy) ? Math.abs(dx) : Math.abs(dy);
    var xInc = dx / steps;
    var yInc = dy / steps;
    var x = x1;
    var y = y1;
    ctx.moveTo(x1,y1);
    for (var i = 0; i <= steps; i++) {
      x += xInc;
      y += yInc;
      ctx.lineTo(x,y);
    }
    ctx.stroke();
}


