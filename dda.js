var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
let startX, startY, endX, endY;

canvas.addEventListener("mousedown", function(event) {
    startX = event.offsetX;
    startY = event.offsetY;
});

canvas.addEventListener("mouseup", function(event) {
    endX = event.offsetX;
    endY = event.offsetY;
    drawCircle(startX, startY, endX, endY)
});

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
function drawSquare(x1, y1, x2, y2) {
  //Primera linea base
  DDA(x1, y1, x2, y2)

  //segunda linea base
  dyx = y1 + Math.abs(x2 - x1);
  DDA(x1, y1, x1, dyx)

  //tercera linea base
  DDA(x1, dyx, x2, dyx)

  //cuarta linea base
  DDA(x2, dyx, x2, y2)
}

function drawCircle(startX, startY, endX, endY) {
  let x0 = (startX + endX) / 2;
  let y0 = (startY + endY) / 2;
  radius  = Math.max(Math.abs(startX - endX), Math.abs(startY - endY)) / 2;
  let x = radius;
  let y = 0;
  let decisionOver2 = 1 - x;

  while (y <= x) {
    context.fillRect(x + x0, y + y0, 1, 1);
    context.fillRect(y + x0, x + y0, 1, 1);
    context.fillRect(-x + x0, y + y0, 1, 1);
    context.fillRect(-y + x0, x + y0, 1, 1);
    context.fillRect(-x + x0, -y + y0, 1, 1);
    context.fillRect(-y + x0, -x + y0, 1, 1);
    context.fillRect(x + x0, -y + y0, 1, 1);
    context.fillRect(y + x0, -x + y0, 1, 1);
    y++;
    if (decisionOver2 <= 0) {
      decisionOver2 += 2 * y + 1;
    } else {
      x--;
      decisionOver2 += 2 * (y - x) + 1;
    }
  }
}