// Obtener el canvas y el contexto de dibujo
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Variables para el punto de inicio y el punto final de la línea
let startX, startY, endX, endY;
let lines = [];

// Función para dibujar una línea usando el algoritmo DDA
function drawLineDDA(startX, startY, endX, endY) {
  // Calcular la distancia en x y en y
  const dx = endX - startX;
  const dy = endY - startY;

  // Calcular la longitud de la línea
  const length = Math.max(Math.abs(dx), Math.abs(dy));

  // Calcular el incremento en x y en y
  const xIncrement = dx / length;
  const yIncrement = dy / length;

  // Dibujar la línea pixel por pixel
  let x = startX;
  let y = startY;
  for (let i = 0; i < length; i++) {
    ctx.fillRect(x, y, 1, 1);
    x += xIncrement;
    y += yIncrement;
  }
}

// Función para limpiar el lienzo
function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Evento de escucha de mouse para detectar clic y arrastre
canvas.addEventListener('mousedown', function(event) {
  startX = event.offsetX;
  startY = event.offsetY;
});

// Función para manejar el movimiento del mouse
canvas.addEventListener("mousemove", function(event) {
  endX = event.offsetX;
  endY = event.offsetY;
});

// Evento de escucha de mouse para detectar liberación del botón
canvas.addEventListener('mouseup', function(event) {
  endX = event.offsetX;
  endY = event.offsetY;
  let obj = {    
    startX : startX,
    startY : startY,
    endX : endX,
    endY : endY,
  };
  lines.push(obj)
  clearCanvas();
  for (let i = 0; i < lines.length; i++) {
    obj = lines[i]
    drawLineDDA(obj.startX, obj.startY, obj.endX, obj.endY)
  }
});
