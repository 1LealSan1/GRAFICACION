const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let startX, startY, endX, endY, option; //variables de inicio para los dos puntos y la opcion seleccionada a dibujar
let lines = [], points = [], lines2 = [], points2 = [], aux=[];
let isDrawing = false; // Indica si se está dibujando actualmente
var obj = new Object();
var muestrario, color, grosor, gr;// variables para alamcenar el input color y el color en hexa
var selectfigure, posfigure;
//escucha el evento de cargar la pagina y manda llamar la funcion starup
window.addEventListener("load", startup, false);

//obtiene el input y define el valor predeterminado de value del input y manda llamar al evento actualizar si se detecta un cambio en el input
function startup() {
  muestrario = document.querySelector("#muestrario");
  grosor = document.querySelector("#rangegr");
  color = muestrario.value;
  gr = grosor.value;
  document.getElementById("numb").innerHTML = gr;
  muestrario.addEventListener("input", actualizarPrimero, false);
  grosor.addEventListener("input", actualizarPrimero2, false);
}

//obtiene el nuevo valor del input color 
function actualizarPrimero(event) {
  color =  event.target.value;
  if(selectfigure){
    cambiarcolor();
  }
}
function actualizarPrimero2(event){
  gr = event.target.value;
  document.getElementById("numb").innerHTML = gr;
  if(selectfigure){
    cambiarGrosor();
  }
}

function cambiarcolor(){
  lines[posfigure].color = color;
  clearCanvas()
}
function cambiarGrosor(){
  lines[posfigure].grosor = gr;
  clearCanvas()
}
function trash(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  lines = []
}

function eraser(){
  if(selectfigure){
    data = lines[posfigure]
    lines2.push(data)

    lines.splice(posfigure, 1)
    clearCanvas()

    posfigure = null;
    selectfigure = false;
  }
}
function deshacer(){
  if(lines.length>0){
    let data = lines.pop();
    lines2.push(data)
    clearCanvas()
  }
}

function rehacer(){
  if(lines2.length>0){
    let data = lines2.pop();
    lines.push(data)
    clearCanvas()
  }
}
// Función para limpiar el lienzo
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    barrido();
}
//hace un barrido al arreglo y dibuja las figuras guardadas en el arreglo
function barrido(){
    lines.forEach(function(line) {
      if(line.option=="lapiz"){
        menu(0, 0, 0, 0, line.option, line.color, line.grosor, line.points)
      }else{
        menu(line.startX, line.startY, line.endX, line.endY, line.option, line.color, line.grosor, 0);
      }
    });
}
// Evento de escucha de mouse para detectar clic y arrastre
canvas.addEventListener('mousedown', function(event) {
    startX = event.offsetX;
    startY = event.offsetY;
    isDrawing = true; // Indica que se está dibujando actualmente
    if(option=="lapiz"){
      points.push({ x: event.offsetX, y: event.offsetY });  
    }else if(option!='lapiz'){
      points2.push({ x: event.offsetX, y: event.offsetY });  
    }
});

// Función para manejar el movimiento del mouse
canvas.addEventListener("mousemove", function(event) {
    if (isDrawing) { // Verifica si se está dibujando actualmente
      clearCanvas()
      if(option=="lapiz"){
        points.push({ x: event.offsetX, y: event.offsetY });
        menu(0, 0, 0, 0, option, color, gr ,points)
      }else if(option!='lapiz'){
        points2.push({ x: event.offsetX, y: event.offsetY });
        menu(startX, startY, event.offsetX, event.offsetY, option, color, gr); // Dibuja la figura previsualizada
      }
    }
  });

// Evento de escucha de mouse para detectar liberación del botón
canvas.addEventListener('mouseup', function(event) {
    endX = event.offsetX;
    endY = event.offsetY;
    isDrawing = false; // Indica que ya no se está dibujando
    if(option!="cursor" && option!=null && option!="lapiz"){
        obj = {    
            startX : startX,
            startY : startY,
            endX : endX,
            endY : endY,
            option: option,
            color: color,
            grosor: gr,
            points: points2
        };
        lines.push(obj)
        aux = lines.slice();
        lines2.push([aux])

    }else if(option!="cursor" && option!=null && option=="lapiz"){
        obj = {    
          startX : startX,
          startY : startY,
          endX : endX,
          endY : endY,
          option: option,
          color: color,
          grosor: gr,
          points: points
        };
        lines.push(obj)
        aux = lines.slice();
        lines2.push([aux])

    }
    aux = [];
    points = [];
    points2 = [];
});
canvas.addEventListener('click', function(event){
  optX= event.offsetX;
  optY= event.offsetY;
  encontrado = false;
  let puntero =null, posobjselect=null; 
  lines.forEach(function(line) {
    puntero =puntero+ 1;
    line.points.forEach(function(point){
      if((optX >= point.x-3) && (optX <= point.x+3) && (optY >= point.y-3) && (optY <= point.y+3)){
        encontrado = true;
      }
    })
    if(encontrado== true && posobjselect== null){
      posobjselect = puntero -1;
      selectfigure = encontrado;
      posfigure = posobjselect
      console.log(lines[posfigure])
    }
  });
});

//Guarda la opcion elegida en el menu de figuras
function opcion(op){
  option = op
}

function menu(x1, y1 , x2 , y2, opt, c, g, point){
  if(x1!=null && y1!=null && x2!= null && y2 != null ){
    if(opt == 'line'){
        Bresenham(x1, y1 , x2 , y2, c, g)
      }else if(opt =='circle'){
        drawCircle(x1, y1 , x2 , y2, c, g)
      }else if(opt == 'square'){
        drawSquare(x1, y1 , x2 , y2, c, g)
      }else if(opt == 'pentagon'){
        drawPoligon(x1, y1 , x2 , y2, 5,c, g)
      }else if(opt == 'hexagon'){
        drawPoligon(x1, y1 , x2 , y2, 6,c, g)
      }else if(opt == 'heptagon'){
        drawPoligon(x1, y1 , x2 , y2, 7,c, g)
      }else if(opt == 'octagon'){
        drawPoligon(x1, y1 , x2 , y2, 8,c, g)
      }else if(opt == 'lapiz'){
        DrawPencil(point, c, g)
      } else if(opt == 'rectangulo'){
        drawRectangulo(x1, y1 , x2 , y2, c, g)
      } else if(opt == 'triangle'){
        drawTriangle(x1, y1 , x2 , y2, c, g)
      }
  }
}

function DrawPencil(points, c, g){
  ctx.lineWidth = g;
  ctx.strokeStyle=String(c);
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  for (let i = 1; i < points.length; i++) {
    ctx.lineTo(points[i].x, points[i].y);
  }
  ctx.stroke();
}

function Bresenham(startX, startY, endX, endY, c, g) {
  let dx = Math.abs(endX - startX);
  let dy = Math.abs(endY - startY);
  let sx = (startX < endX) ? 1 : -1;
  let sy = (startY < endY) ? 1 : -1;
  let error = dx - dy;

  while (true) {  
    ctx.lineWidth = g;
    ctx.strokeStyle=String(c);
    points2.push({ x: startX, y: startY});  
    ctx.strokeRect(startX, startY,1,1)

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

function drawSquare(startX, startY, endX, endY, c, g) {
  var width = Math.abs(endX - startX);
  var height = Math.abs(endY - startY);
  var squareSize = Math.max(width, height);

  var centerX = (startX + endX) / 2;
  var centerY = (startY + endY) / 2;

  var squareX = centerX - squareSize / 2;
  var squareY = centerY - squareSize / 2;
  Bresenham(squareX, squareY, squareX + squareSize, squareY, c, g);
  Bresenham(squareX + squareSize, squareY, squareX + squareSize, squareY + squareSize, c, g);
  Bresenham(squareX + squareSize, squareY + squareSize, squareX, squareY + squareSize, c, g);
  Bresenham(squareX, squareY + squareSize, squareX, squareY, c, g);
}

function drawCircle(startX, startY, endX, endY, c, g) {
  let x0 = (startX + endX) / 2;
  let y0 = (startY + endY) / 2;
  radius  = Math.max(Math.abs(startX - endX), Math.abs(startY - endY)) / 2;
  let x = radius;
  let y = 0;
  let decisionOver2 = 1 - x;
  ctx.lineWidth = g;
  while (y <= x) {

    points2.push({ x:x + x0 , y:y + y0 });
    points2.push({x:y + x0, y:x + y0});
    points2.push({x:-x + x0,y: y + y0});
    points2.push({x:-y + x0,y: x + y0});
    points2.push({x:-x + x0,y: -y + y});
    points2.push({x:-y + x0,y: -x + y0});
    points2.push({x:x + x0,y: -y + y0});
    points2.push({x:y + x0,y: -x + y0});

    ctx.strokeStyle=String(c);
    ctx.strokeRect(x + x0, y + y0, 1, 1);
    ctx.strokeRect(y + x0, x + y0, 1, 1);
    ctx.strokeRect(-x + x0, y + y0, 1, 1);
    ctx.strokeRect(-y + x0, x + y0, 1, 1);
    ctx.strokeRect(-x + x0, -y + y0, 1, 1);
    ctx.strokeRect(-y + x0, -x + y0, 1, 1);
    ctx.strokeRect(x + x0, -y + y0, 1, 1);
    ctx.strokeRect(y + x0, -x + y0, 1, 1);

    y++;
    if (decisionOver2 <= 0) {
      decisionOver2 += 2 * y + 1;
    } else {
      x--;
      decisionOver2 += 2 * (y - x) + 1;
    }
  }
}

function drawPoligon2(centerX, centerY, xCoords, yCoords, sides, c, g){
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
    ctx.lineWidth = g;
    ctx.beginPath();
    ctx.moveTo(x, y);
  
    for (let j = 0; j < steps; j++) { 
        x += xIncrement;
        y += yIncrement;
        points2.push({ x:x,y:y });
        ctx.lineTo(x, y);
    }
    ctx.stroke();
  }
}

function drawRectangulo(startX, startY, endX, endY, c, g){

  const width = endX - startX;
  const height = endY - startY;

  Bresenham(startX, startY, startX + width, startY, c, g); // draw top side
  Bresenham(startX, startY + height, startX + width, startY + height, c, g); // draw bottom side
  Bresenham(startX, startY, startX, startY + height, c, g); // draw left side
  Bresenham(startX + width, startY, startX + width, startY + height, c, g); // draw right side
}

function drawPoligon(startX, startY, endX, endY, sides, c, g){
  let centerX = (startX + endX) / 2;
  let centerY = (startY + endY) / 2;
  let xCoords = [], yCoords = [];
  radius  = Math.max(Math.abs(startX - endX), Math.abs(startY - endY)) / 2;

  drawPoligon2(centerX, centerY, xCoords, yCoords, sides, c , g)
}
function drawTriangle(x1,y1,x2,y2,c,g){
  // calcular las coordenadas del tercer punto
  var deltaX = x2 - x1;
  var deltaY = y2 - y1;
  var angle = Math.atan2(deltaY, deltaX);
  var length = Math.min(canvas.width, canvas.height) / 3;
  x3 = Math.round(x1 + length * Math.cos(angle - Math.PI / 3));
  y3 = Math.round(y1 + length * Math.sin(angle - Math.PI / 3));
  
  // dibujar el triángulo utilizando el algoritmo Bresenham
  Bresenham(x1, y1, x2, y2, c, g);
  Bresenham(x2, y2, x3, y3, c, g);
  Bresenham(x3, y3, x1, y1, c, g);
}

function guardar(){
  if(lines.length>0){
  // Convertir el array de números aleatorios a una cadena JSON
  const numerosAleatoriosJSON = JSON.stringify(lines);

  // Crear un archivo JSON con los números aleatorios y descargarlo en el navegador
  const blob = new Blob([numerosAleatoriosJSON], { type: "application/json;charset=utf-8" });
  saveAs(blob, "name.json");
  }
}

function cargar(){
   // Cargar el archivo JSON desde el input file
   const input = document.createElement("input");
   input.type = "file";
   input.accept = ".json";
   input.onchange = () => {
     const reader = new FileReader();
     reader.readAsText(input.files[0]);
     reader.onload = () => {
       // Parsear la cadena JSON a un array de números aleatorios y asignarlo a la variable correspondiente
       lines = JSON.parse(reader.result);

       // Mostrar los números aleatorios cargados en el elemento correspondiente
       clearCanvas();
     };
   };
   input.click();
}

function convertToPNG(){
  if(lines.length>0){
    var image = new Image();
    image.onload = function() {
      var link = document.createElement('a');
      link.href = canvas.toDataURL("image/png");
      link.download = "imagen.png";
      link.click();
    };
    image.src = canvas.toDataURL("image/png");
  }
}

function convertToPDF(){
  if(lines.length>0){
    // Crea un nuevo objeto jsPDF
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'pt',
      format: [canvas.width, canvas.height]
    });

    // Agrega la imagen del canvas al PDF
    pdf.addImage(canvas.toDataURL(), 'PNG', 0, 0, canvas.width, canvas.height);

    // Descarga el archivo PDF
    pdf.save('archivo.pdf');
  }
}

function moverAtras(){
  if(selectfigure){
      if(posfigure > 0){
          let aux = lines[posfigure-1];
          lines[posfigure-1] = lines[posfigure]
          lines[posfigure] = aux;
          posfigure = posfigure-1;
          clearCanvas()
      }
  }
}

function moverAdelante(){
  if(selectfigure){
      if(posfigure < (lines.length-1)){
          let aux = lines[posfigure+1];
          lines[posfigure+1] = lines[posfigure]
          lines[posfigure] = aux;
          posfigure = posfigure+1;
          clearCanvas()
      }
  }
}

function moverFig(){
  
}