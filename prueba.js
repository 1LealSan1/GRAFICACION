const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let startX, startY, endX, endY, option; //variables de inicio para los dos puntos y la opcion seleccionada a dibujar
let lines = [], points = [], lines2 = [], points2 = [], aux=[], points3 =[], points4 = [];
let isDrawing = false; // Indica si se está dibujando actualmente
let isDragging = false;
var obj = new Object();
var figseg
var muestrario, color, grosor, gr, muestrario2,colorfondo;// variables para alamcenar el input color y el color en hexa
var selectfigure, posfigure;
//escucha el evento de cargar la pagina y manda llamar la funcion starup
window.addEventListener("load", startup, false);

//obtiene el input y define el valor predeterminado de value del input y manda llamar al evento actualizar si se detecta un cambio en el input
function startup() {
  muestrario = document.querySelector("#muestrario");
  muestrario2 = document.querySelector("#muestrario2");
  grosor = document.querySelector("#rangegr");

  color = muestrario.value;
  colorfondo = muestrario2.value;
  gr = grosor.value;

  document.getElementById("numb").innerHTML = gr;
  muestrario.addEventListener("input", actualizarPrimero, false);
  muestrario2.addEventListener("input", actualizarPrimero3, false);
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
function actualizarPrimero3(event) {
 colorfondo =  event.target.value;
  if(selectfigure){
    cambiarcolorfondo();
  }
}

function cambiarcolor(){
  lines[posfigure].color = color;

  clearCanvas()
}
function cambiarcolorfondo(){
  lines[posfigure].colorfondo = colorfondo;

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
        menu(0, 0, 0, 0, line.option, line.color, line.grosor, line.points,0)
      }else{
        menu(line.startX, line.startY, line.endX, line.endY, line.option, line.color, line.grosor, line.points, line.colorfondo);
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
    }else if(option!='lapiz' && option!='moverfig'){
      points2.push({ x: event.offsetX, y: event.offsetY });  
    }else if (option=='moverfig') {
      verificarpunto=rectificarclick(startX,startY)
      isDragging = true; 
      isDrawing= false
    }
});

// Función para manejar el movimiento del mouse
canvas.addEventListener("mousemove", function(event) {
    if (isDrawing) { // Verifica si se está dibujando actualmente
      clearCanvas()
      if(option=="lapiz"){
        points.push({ x: event.offsetX, y: event.offsetY });
        menu(0, 0, 0, 0, option, color, gr ,points,0)
      }else if(option!='lapiz' && option!='moverfig'){
        points2.push({ x: event.offsetX, y: event.offsetY });
        menu(startX, startY, event.offsetX, event.offsetY, option, color, gr, 0, colorfondo); // Dibuja la figura previsualizada
      }
    }else if (isDragging) {
      if (verificarpunto==true) {
        moverFig(event.offsetX, event.offsetY)
      }
    }
  });

// Evento de escucha de mouse para detectar liberación del botón
canvas.addEventListener('mouseup', function(event) {
    endX = event.offsetX;
    endY = event.offsetY;
    isDrawing = false; // Indica que ya no se está dibujando
    isDragging = false;
    if(option!="cursor" && option!=null && option!="lapiz" && option != "moverfig"){
        obj = {    
            startX : startX,
            startY : startY,
            endX : endX,
            endY : endY,
            option: option,
            color: color,
            grosor: gr,
            points: points2,
            colorfondo: colorfondo
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
          points: points,
          colorfondo: null
        };
        lines.push(obj)
        aux = lines.slice();
        lines2.push([aux])

    }else if(option!="cursor" && option!=null && option!="lapiz" && option == "moverfig" && points4.length!=0){
      lines[posfigure].points=(points4.concat(points2))
    }
    aux = [];
    points = [];
    points2 = [];
    points3 = [];
    points4 = [];      
    verificarpunto = false
    console.log(lines)
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

function rectificarclick(optX, optY) {
    encontrado = false;
    let puntero =null, posobjselect=null; 

    lines.forEach(function(line) {
      puntero =puntero+ 1;
      line.points.forEach(function(point){
        if((optX >= point.x-3) && (optX <= point.x+3) && (optY >= point.y-3) && (optY <= point.y+3)){
          encontrado = true;
        }
      })
    });
    return encontrado;
}

//Guarda la opcion elegida en el menu de figuras
function opcion(op){
  option = op
}

function menu(x1, y1 , x2 , y2, opt, c, g, point, colorfondo){
  if(x1!=null && y1!=null && x2!= null && y2 != null ){
    if(opt == 'line'){
        Bresenham(x1, y1 , x2 , y2, c, g)
      }else if(opt =='circle'){
        drawCircle(x1, y1 , x2 , y2, c, g, colorfondo)
      }else if(opt == 'square'){
        drawSquare(x1, y1 , x2 , y2, c, g, colorfondo)
      }else if(opt == 'pentagon'){
        drawPoligon(x1, y1 , x2 , y2, 5,c, g,colorfondo)
      }else if(opt == 'hexagon'){
        drawPoligon(x1, y1 , x2 , y2, 6,c, g,colorfondo)
      }else if(opt == 'heptagon'){
        drawPoligon(x1, y1 , x2 , y2, 7,c, g,colorfondo)
      }else if(opt == 'octagon'){
        drawPoligon(x1, y1 , x2 , y2, 8,c, g,colorfondo)
      }else if(opt == 'lapiz'){
        DrawPencil(point, c, g)
      } else if(opt == 'rectangulo'){
        drawRectangulo(x1, y1 , x2 , y2, c, g,colorfondo)
      } else if(opt == 'triangle'){
        drawTriangle(x1, y1 , x2 , y2, c, g,colorfondo)
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

    if(isDragging==true){
      points3.push({ x: startX, y: startY});
      points4 = points3
    }else{
      points2.push({ x: startX, y: startY}); 
    }
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
  points3 = []
}

function drawSquare(startX, startY, endX, endY, c, g,cf) {
  var width = Math.abs(endX - startX);
  var height = Math.abs(endY - startY);
  var squareSize = Math.max(width, height);

  var centerX = (startX + endX) / 2;
  var centerY = (startY + endY) / 2;

  var squareX = centerX - squareSize / 2;
  var squareY = centerY - squareSize / 2;

  // Recolectar puntos del fondo de la figura
  for (let x = squareX; x <= squareX + squareSize; x++) {
    for (let y = squareY; y <= squareY + squareSize; y++) {
        if(isDragging==true){
          points3.push({ x:x,y:y });
          points2 = points3
        }else{
          points2.push({ x:x,y:y });
        }
      // Pintar el pixel del fondo con el color deseado
      ctx.fillStyle = String(cf);
      ctx.fillRect(x, y, 1, 1);
    }
  }

  Bresenham(squareX, squareY, squareX + squareSize, squareY, c, g);
  Bresenham(squareX + squareSize, squareY, squareX + squareSize, squareY + squareSize, c, g);
  Bresenham(squareX + squareSize, squareY + squareSize, squareX, squareY + squareSize, c, g);
  Bresenham(squareX, squareY + squareSize, squareX, squareY, c, g);
  points3 = []
}

function drawCircle(startX, startY, endX, endY, c, g, cf) {
  let x0 = (startX + endX) / 2;
  let y0 = (startY + endY) / 2;
  radius  = Math.max(Math.abs(startX - endX), Math.abs(startY - endY)) / 2;
  let x = radius;
  let y = 0;
  let decisionOver2 = 1 - x;
  ctx.lineWidth = g;
  while (y <= x) {
    if(isDragging==true){
      points3.push({ x:x + x0 , y:y + y0 });
      points3.push({x:y + x0, y:x + y0});
      points3.push({x:-x + x0,y: y + y0});
      points3.push({x:-y + x0,y: x + y0});
      points3.push({x:-x + x0,y: -y + y});
      points3.push({x:-y + x0,y: -x + y0});
      points3.push({x:x + x0,y: -y + y0});
      points3.push({x:y + x0,y: -x + y0}); 
      points4 = points3
    }else{
      points2.push({ x:x + x0 , y:y + y0 });
      points2.push({x:y + x0, y:x + y0});
      points2.push({x:-x + x0,y: y + y0});
      points2.push({x:-y + x0,y: x + y0});
      points2.push({x:-x + x0,y: -y + y});
      points2.push({x:-y + x0,y: -x + y0});
      points2.push({x:x + x0,y: -y + y0});
      points2.push({x:y + x0,y: -x + y0}); 
    }


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
  points3 = []
}

function drawPoligon2(centerX, centerY, xCoords, yCoords, sides, c, g, cf){
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

        if(isDragging==true){
          points3.push({ x:x,y:y });
          points4 = points3
        }else{
          points2.push({ x:x,y:y });
        }
        /*// Recolectar puntos del fondo de la figura
        for (let x = Math.min(...xCoords); x <= Math.max(...xCoords); x++) {
          for (let y = Math.min(...yCoords); y <= Math.max(...yCoords); y++) {
            points2.push({ x: x, y: y });
          }
        }*/
        ctx.lineTo(x, y);
    }
    ctx.stroke();
  }
  points3 = []
}

function drawRectangulo(startX, startY, endX, endY, c, g, cf){

  const width = endX - startX;
  const height = endY - startY;
  // Recolectar puntos del fondo de la figura
    for (let x = startX; x <= startX + width; x++) {
      for (let y = startY; y <= startY + height; y++) {
        if(isDragging==true){
          points3.push({ x: x, y: y });
          points2 = points3
        }else{
          points2.push({ x: x, y: y });
        }
        // Pintar el fondo del rectángulo con el color especificado en cf
        ctx.fillStyle = cf;
        ctx.fillRect(x, y, 1, 1);
      }
    }
  Bresenham(startX, startY, startX + width, startY, c, g); // draw top side
  Bresenham(startX, startY + height, startX + width, startY + height, c, g); // draw bottom side
  Bresenham(startX, startY, startX, startY + height, c, g); // draw left side
  Bresenham(startX + width, startY, startX + width, startY + height, c, g); // draw right side

}

function drawPoligon(startX, startY, endX, endY, sides, c, g, cf){
  let centerX = (startX + endX) / 2;
  let centerY = (startY + endY) / 2;
  let xCoords = [], yCoords = [];
  radius  = Math.max(Math.abs(startX - endX), Math.abs(startY - endY)) / 2;

  drawPoligon2(centerX, centerY, xCoords, yCoords, sides, c , g, cf)
}
function drawTriangle(x1,y1,x2,y2,c,g, cf){
  // calcular las coordenadas del tercer punto
  var deltaX = x2 - x1;
  var deltaY = y2 - y1;
  var angle = Math.atan2(deltaY, deltaX);
  var length = Math.min(canvas.width, canvas.height) / 3;
  x3 = Math.round(x1 + length * Math.cos(angle - Math.PI / 3));
  y3 = Math.round(y1 + length * Math.sin(angle - Math.PI / 3));
  // Recolectar puntos del fondo de la figura
  for (let x = Math.min(x1, x2, x3); x <= Math.max(x1, x2, x3); x++) {
    for (let y = Math.min(y1, y2, y3); y <= Math.max(y1, y2, y3); y++) {
        if(isDragging==true){
          points3.push({ x: x, y: y }); 
          points2 = points3
        }else{
          points2.push({ x: x, y: y });
        }
    }
  }
  // Pintar el fondo del triángulo
  ctx.fillStyle = cf; // Color de relleno
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.lineTo(x3, y3);
  ctx.closePath();
  ctx.fill();
  // dibujar el triángulo utilizando el algoritmo Bresenham
  Bresenham(x1, y1, x2, y2, c, g);
  Bresenham(x2, y2, x3, y3, c, g);
  Bresenham(x3, y3, x1, y1, c, g);
  points3 = []
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

function moverFig(x3, y3) {
  figseg = lines[posfigure];
  if(figseg.option!="lapiz"){
      x1 = figseg.startX;
      y1 = figseg.startY;
      x2 = figseg.endX;
      y2 = figseg.endY;
      dx = x1 - x3
      dy = y1 - y3

      figseg.startX = Math.round(x1 - dx)
      figseg.startY = Math.round(y1 - dy)
      figseg.endX = Math.round( x2 - dx)
      figseg.endY = Math.round(y2 - dy)

      lines[posfigure].startX = figseg.startX;
      lines[posfigure].startY = figseg.startY;
      lines[posfigure].endX = figseg.endX;
      lines[posfigure].endY = figseg.endY;

  }else if (figseg.option=="lapiz") {
    for (let i = 0; i < figseg.points.length; i++) {
      x1 = figseg.points[i].x
      y1 = figseg.points[i].y

      dx = x1 - x3
      dy = y1 - y3

      figseg.points[i].x += Math.round(x1 - x3)
      figseg.points[i].y += Math.round(y1 - y3)

      lines[posfigure].points[i].x = figseg.points[i].x
      lines[posfigure].points[i].y = figseg.points[i].y
    }
  }
  clearCanvas();
}