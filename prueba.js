const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let startX, startY, endX, endY, option; //variables de inicio para los dos puntos y la opcion seleccionada a dibujar
let lines = [];
let isDrawing = false; // Indica si se está dibujando actualmente
var obj = new Object();
var muestrario, color;// variables para alamcenar el input color y el color en hexa

//escucha el evento de cargar la pagina y manda llamar la funcion starup
window.addEventListener("load", startup, false);

//obtiene el input y define el valor predeterminado de value del input y manda llamar al evento actualizar si se detecta un cambio en el input
function startup() {
  muestrario = document.querySelector("#muestrario");
  color = muestrario.value;
  muestrario.addEventListener("input", actualizarPrimero, false);
}
//obtiene el nuevo valor del input color 
function actualizarPrimero(event) {
  color =  event.target.value;
}

// Función para limpiar el lienzo
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    barrido();
}
//hace un barrido al arreglo y dibuja las figuras guardadas en el arreglo
function barrido(){
    lines.forEach(function(line) {
        menu(line.startX, line.startY, line.endX, line.endY, line.option, line.color);
    });
}
// Evento de escucha de mouse para detectar clic y arrastre
canvas.addEventListener('mousedown', function(event) {
    startX = event.offsetX;
    startY = event.offsetY;
    isDrawing = true; // Indica que se está dibujando actualmente
});

// Función para manejar el movimiento del mouse
canvas.addEventListener("mousemove", function(event) {
    if (isDrawing) { // Verifica si se está dibujando actualmente
      clearCanvas()
      menu(startX, startY, event.offsetX, event.offsetY, option, color); // Dibuja la figura previsualizada
    }
  });

// Evento de escucha de mouse para detectar liberación del botón
canvas.addEventListener('mouseup', function(event) {
    endX = event.offsetX;
    endY = event.offsetY;
    isDrawing = false; // Indica que ya no se está dibujando
    if(option!="cursor" && option!=null){
        obj = {    
            startX : startX,
            startY : startY,
            endX : endX,
            endY : endY,
            option: option,
            color: color
        };
        lines.push(obj)
    }
    console.log(lines)
});

//Guarda la opcion elegida en el menu de figuras
function opcion(op){
  option = op
}

function menu(x1, y1 , x2 , y2, opt, c){
  if(x1!=null && y1!=null && x2!= null && y2 != null ){
    if(opt == 'line'){
        Bresenham(x1, y1 , x2 , y2, c)
      }else if(opt =='circle'){
        drawCircle(x1, y1 , x2 , y2, c)
      }else if(opt == 'square'){
        drawSquare(x1, y1 , x2 , y2, c)
      }else if(opt == 'pentagon'){
        drawPoligon(x1, y1 , x2 , y2, 5,c)
      }else if(opt == 'hexagon'){
        drawPoligon(x1, y1 , x2 , y2, 6,c)
      }else if(opt == 'heptagon'){
        drawPoligon(x1, y1 , x2 , y2, 7,c)
      }else if(opt == 'octagon'){
        drawPoligon(x1, y1 , x2 , y2, 8,c)
      } 
  }
}

function Bresenham(startX, startY, endX, endY, c) {
  let dx = Math.abs(endX - startX);
  let dy = Math.abs(endY - startY);
  let sx = (startX < endX) ? 1 : -1;
  let sy = (startY < endY) ? 1 : -1;
  let error = dx - dy;
  while (true) {
    ctx.fillStyle=String(c);
    ctx.fillRect(startX, startY, 1, 1)

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

function drawSquare(startX, startY, endX, endY, c) {
  var width = Math.abs(endX - startX);
  var height = Math.abs(endY - startY);
  var squareSize = Math.max(width, height);

  var centerX = (startX + endX) / 2;
  var centerY = (startY + endY) / 2;

  var squareX = centerX - squareSize / 2;
  var squareY = centerY - squareSize / 2;
  Bresenham(squareX, squareY, squareX + squareSize, squareY, c);
  Bresenham(squareX + squareSize, squareY, squareX + squareSize, squareY + squareSize, c);
  Bresenham(squareX + squareSize, squareY + squareSize, squareX, squareY + squareSize, c);
  Bresenham(squareX, squareY + squareSize, squareX, squareY, c);
}

function drawCircle(startX, startY, endX, endY, c) {
  let x0 = (startX + endX) / 2;
  let y0 = (startY + endY) / 2;
  radius  = Math.max(Math.abs(startX - endX), Math.abs(startY - endY)) / 2;
  let x = radius;
  let y = 0;
  let decisionOver2 = 1 - x;

  while (y <= x) {
    ctx.fillStyle=String(c);
    ctx.fillRect(x + x0, y + y0, 1, 1);
    ctx.fillRect(y + x0, x + y0, 1, 1);
    ctx.fillRect(-x + x0, y + y0, 1, 1);
    ctx.fillRect(-y + x0, x + y0, 1, 1);
    ctx.fillRect(-x + x0, -y + y0, 1, 1);
    ctx.fillRect(-y + x0, -x + y0, 1, 1);
    ctx.fillRect(x + x0, -y + y0, 1, 1);
    ctx.fillRect(y + x0, -x + y0, 1, 1);

    y++;
    if (decisionOver2 <= 0) {
      decisionOver2 += 2 * y + 1;
    } else {
      x--;
      decisionOver2 += 2 * (y - x) + 1;
    }
  }
}

function drawPoligon2(centerX, centerY, xCoords, yCoords, sides, c){
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
    ctx.strokeStyle = String(c)
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

function drawPoligon(startX, startY, endX, endY, sides, c){
  let centerX = (startX + endX) / 2;
  let centerY = (startY + endY) / 2;
  let xCoords = [], yCoords = [];
  radius  = Math.max(Math.abs(startX - endX), Math.abs(startY - endY)) / 2;

  drawPoligon2(centerX, centerY, xCoords, yCoords, sides, c)
}