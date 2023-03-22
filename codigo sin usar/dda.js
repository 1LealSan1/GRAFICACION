var canvas = document.getElementById('canvas');
var preview = document.getElementById('preview')
var context = preview.getContext('2d');
var ctx = canvas.getContext('2d');

let startX, startY, endX, endY, option, isDrawing=false, l;
var obj = new Object();
elementos = [];

preview.addEventListener("mousedown", function(event){
  startX = event.offsetX;
  startY = event.offsetY;
  isDrawing = true;
});

preview.addEventListener("mousemove", function(event) {
  if (!isDrawing) return;
  endX = event.offsetX;
  endY = event.offsetY;
  limpiar();
  l =0;
  menu(l);
});

preview.addEventListener("mouseup",function(event){
  isDrawing = false;
  endX = event.offsetX;
  endY = event.offsetY;
  l=1;
  obj ={
    startX : startX,
    startY : startY,
    endX : endX,
    endY : endY,
    l : l,
    option: option
  }
  if(obj.option!=null && obj.option != "cursor"){
    elementos.push(obj);
    console.log(elementos)
    menu()
  }
});

function opcion(op){
  option = op
}

function limpiar(){
  context.clearRect(0, 0, preview.width, preview.height);
}

function menu(){
  if(startX!=null && startY!=null && endX!= null && endY != null ){
    if(option == 'line'){
      Bresenham(startX, startY, endX, endY, l)
    }else if(option =='circle'){
      drawCircle(startX, startY, endX, endY, l)
    }else if(option == 'square'){
      drawSquare(startX, startY, endX, endY, l)
    }else if(option == 'pentagon'){
      drawPoligon(startX, startY, endX, endY, 5, l)
    }else if(option == 'hexagon'){
      drawPoligon(startX, startY, endX, endY, 6, l)
    }else if(option == 'heptagon'){
      drawPoligon(startX, startY, endX, endY, 7, l)
    }else if(option == 'octagon'){
      drawPoligon(startX, startY, endX, endY, 8, l)
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
    }else if(l==1){
      ctx.fillRect(startX, startY, 1, 1)
    }
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

function drawSquare(startX, startY, endX, endY, l) {
  var width = Math.abs(endX - startX);
  var height = Math.abs(endY - startY);
  var squareSize = Math.max(width, height);

  var centerX = (startX + endX) / 2;
  var centerY = (startY + endY) / 2;

  var squareX = centerX - squareSize / 2;
  var squareY = centerY - squareSize / 2;
  
  Bresenham(squareX, squareY, squareX + squareSize, squareY, l);
  Bresenham(squareX + squareSize, squareY, squareX + squareSize, squareY + squareSize, l);
  Bresenham(squareX + squareSize, squareY + squareSize, squareX, squareY + squareSize, l);
  Bresenham(squareX, squareY + squareSize, squareX, squareY, l);
}

function drawCircle(startX, startY, endX, endY, l) {
  let x0 = (startX + endX) / 2;
  let y0 = (startY + endY) / 2;
  radius  = Math.max(Math.abs(startX - endX), Math.abs(startY - endY)) / 2;
  let x = radius;
  let y = 0;
  let decisionOver2 = 1 - x;

  while (y <= x) {
    if(l==0){
      context.fillRect(x + x0, y + y0, 1, 1);
      context.fillRect(y + x0, x + y0, 1, 1);
      context.fillRect(-x + x0, y + y0, 1, 1);
      context.fillRect(-y + x0, x + y0, 1, 1);
      context.fillRect(-x + x0, -y + y0, 1, 1);
      context.fillRect(-y + x0, -x + y0, 1, 1);
      context.fillRect(x + x0, -y + y0, 1, 1);
      context.fillRect(y + x0, -x + y0, 1, 1);
    }else if(l==1){
      ctx.fillRect(x + x0, y + y0, 1, 1);
      ctx.fillRect(y + x0, x + y0, 1, 1);
      ctx.fillRect(-x + x0, y + y0, 1, 1);
      ctx.fillRect(-y + x0, x + y0, 1, 1);
      ctx.fillRect(-x + x0, -y + y0, 1, 1);
      ctx.fillRect(-y + x0, -x + y0, 1, 1);
      ctx.fillRect(x + x0, -y + y0, 1, 1);
      ctx.fillRect(y + x0, -x + y0, 1, 1);
    }
    y++;
    if (decisionOver2 <= 0) {
      decisionOver2 += 2 * y + 1;
    } else {
      x--;
      decisionOver2 += 2 * (y - x) + 1;
    }
  }
}

function drawPoligon2(centerX, centerY, xCoords, yCoords, sides, l){
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
    if(l==0){
      context.beginPath();
      context.moveTo(x, y);
  
      for (let j = 0; j < steps; j++) {
        x += xIncrement;
        y += yIncrement;
        context.lineTo(x, y);
      }
  
      context.stroke();
    }else if(l==1){
      ctx.beginPath();
      ctx.moveTo(x, y);
  
      for (let j = 0; j < steps; j++) {
        x += xIncrement;
        y += yIncrement;
        ctx.lineTo(x, y);
      }
  
      ctx.stroke();
    }
  }
}

function drawPoligon(startX, startY, endX, endY, sides, l){
  let centerX = (startX + endX) / 2;
  let centerY = (startY + endY) / 2;
  let xCoords = [], yCoords = [];
  radius  = Math.max(Math.abs(startX - endX), Math.abs(startY - endY)) / 2;

  drawPoligon2(centerX, centerY, xCoords, yCoords, sides, l)
}