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