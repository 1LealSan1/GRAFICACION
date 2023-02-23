var canvas = document.getElementById('canvas');
var preview = document.getElementById('preview')
var context = preview.getContext('2d');
var ctx = preview.getContext('2d');
let startX, startY, endX, endY, option;

preview.addEventListener("mousedown", function(event){
  startX = event.offsetX;
  startY = event.offsetY;
});

preview.addEventListener("mousemove", function(event) {
  endX = event.offsetX;
  endY = event.offsetY;
  limpiar();
  if(startX!=null && startY!=null && endX!= null && endY != null ){
    if(option == 'line'){
      Bresenham(startX, startY, endX, endY, 0)
    }else if(option =='circle'){
      drawCircle(startX, startY, endX, endY)
    }else if(option == 'square'){
      drawSquare(startX, startY, endX, endY)
    }else if(option == 'pentagon'){
      drawPoligon(startX, startY, endX, endY, 5)
    }else if(option == 'hexagon'){
      drawPoligon(startX, startY, endX, endY, 6)
    }else if(option == 'heptagon'){
      drawPoligon(startX, startY, endX, endY, 7)
    }else if(option == 'octagon'){
      drawPoligon(startX, startY, endX, endY, 8)
    }          
  }
});

preview.addEventListener("mouseup",function(event){
  endX = event.offsetX;
  endY = event.offsetY;
  limpiar();
});

function opcion(op){
  option = op
}

function limpiar(){
  context.clearRect(0, 0, preview.width, preview.height);
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

function Bresenham(startX, startY, endX, endY, l) {
  let dx = Math.abs(endX - startX);
  let dy = Math.abs(endY - startY);
  let sx = (startX < endX) ? 1 : -1;
  let sy = (startY < endY) ? 1 : -1;
  let error = dx - dy;

  while (true) {
    if(l== 0){
      context.fillRect(startX, startY, 1, 1);      
    }
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
  Bresenham(x1, y1, x2, y2)

  //segunda linea base
  dyx = y1 + Math.abs(x2 - x1);
  Bresenham(x1, y1, x1, dyx)

  //tercera linea base
  Bresenham(x1, dyx, x2, dyx)

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

function drawPoligon2(centerX, centerY, xCoords, yCoords, sides){
  for (let i = 0; i < sides; i++) {
    const angle = (i * 2 * Math.PI) / sides;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    xCoords.push(x);
    yCoords.push(y);
  }

  for (let i = 0; i < sides; i++) {
    let x1 = xCoords[i];
    let y1 = yCoords[i];
    let x2 = xCoords[(i + 1) % sides];
    let y2 = yCoords[(i + 1) % sides];

    let dx = x2 - x1;
    let dy = y2 - y1;
    let steps = Math.max(Math.abs(dx), Math.abs(dy));

    let xIncrement = dx / steps;
    let yIncrement = dy / steps;

    let x = x1;
    let y = y1;

    context.beginPath();
    context.moveTo(x, y);

    for (let j = 0; j < steps; j++) {
      x += xIncrement;
      y += yIncrement;
      context.lineTo(x, y);
    }

    context.stroke();
  }
}

function drawPoligon(startX, startY, endX, endY, sides){
  let centerX = (startX + endX) / 2;
  let centerY = (startY + endY) / 2;
  let xCoords = [], yCoords = [];
  radius  = Math.max(Math.abs(startX - endX), Math.abs(startY - endY)) / 2;

  drawPoligon2(centerX, centerY, xCoords, yCoords, sides)
}