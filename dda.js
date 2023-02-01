const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
var x1, y1, x2, y2

function showCoords(event) {
  var x = event.offsetX;
  var y = event.offsetY;

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

  if(x1 != null && x2 != null && y1 != null && y2 != null){
    console.log(x1, y1, x2, y2)
    Bresenham(x1, y1, x2, y2)
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
  let dx = Math.abs(x2 - x1);
  let dy = Math.abs(y2 - y1);
  let x = x1;
  let y = y1;
  let sx = x1 < x2 ? 1 : -1;
  let sy = y1 < y2 ? 1 : -1;
  let error = dx - dy;

  while (x !== x2 || y !== y2) {
      context.fillRect(x, y, 1, 1);
      let e2 = 2 * error;
      if (e2 > -dy) {
          error -= dy;
          x += sx;
      }
      if (e2 < dx) {
          error += dx;
          y += sy;
      }
  }
}

function drawLine(startX, startY, endX, endY) {
  let dx = Math.abs(endX - startX);
  let dy = Math.abs(endY - startY);
  let sx = (startX < endX) ? 1 : -1;
  let sy = (startY < endY) ? 1 : -1; 
  let error = dx - dy;

  while(true) {
      context.fillRect(startX, startY, 1, 1);
      if (startX === endX && startY === endY) {
      break;
      }
      let e2 = 2 * error;
      if (e2 > -dy) {
      error = error - dy;
      startX = startX + sx;
      }
      if (e2 < dx) {
      error = error + dx;
      startY = startY + sy;
      }
  }
}

function Bresenham(startX, startY, endX, endY) {
  let dx = Math.abs(endX - startX);
  let dy = Math.abs(endY - startY);
  let sx = (startX < endX) ? 1 : -1;
  let sy = (startY < endY) ? 1 : -1;
  let error = dx - dy;

  while (true) {
    context.fillRect(startX, startY, 1, 1);
    if (startX === endX && startY === endY) break;
    let e2 = 2 * error;
    if (e2 > -dy) {
      error -= dy;
      startX += sx;
    }
    if (e2 < dx) {
      error += dx;
      startY += sy;
    }
  }
}