var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

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

