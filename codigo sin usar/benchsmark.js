const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Función para calcular los puntos intermedios entre dos puntos
// DDA function
function dda(x1, y1, x2, y2) {
    let dx = Math.abs(x2 - x1);
    let dy = Math.abs(y2 - y1);
    let x = x1;
    let y = y1;
    let sx = x1 < x2 ? 1 : -1;
    let sy = y1 < y2 ? 1 : -1;
    let error = dx - dy;
  
    while (x !== x2 || y !== y2) {
        ctx.fillRect(x, y, 1, 1);
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
        ctx.fillRect(startX, startY, 1, 1);
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
      ctx.fillRect(startX, startY, 1, 1);
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

function prueba(){
    var start = window.performance.now();
    // Dibujar 1000 líneas horizontales con un pixel de diferencia izq a der
    for (let i = 0; i < 1000; i++) {
        const x1 = 0;
        const y1 = i;
        const x2 = 1000;
        const y2 = i;
        dda(x1, y1, x2, y2);
    }
    // Dibujar 1000 líneas horizontales con un pixel de diferencia der a izq
    for (let i = 0; i < 1000; i++) {
        const x1 = 0;
        const y1 = i;
        const x2 = 1000;
        const y2 = i;
        dda(x2, y2, x1, y1);
    }
    // Dibujar 1000 líneas verticales con un pixel de diferencia izq a der
    for (let i = 0; i < 1000; i++){
        const x1 = i;
        const y1 = 0;
        const x2 = i;
        const y2 = 1000;
        dda(x1, y1, x2, y2);
    }
    // Dibujar 1000 líneas verticales con un pixel de diferencia der a izq
    for (let i = 0; i < 1000; i++){
        const x1 = i;
        const y1 = 0;
        const x2 = i;
        const y2 = 1000;
        dda(x2, y2, x1, y1);
    }

    let op = 1000;
    //diagonales
    for (let i = 0; i < 1000; i++) {
        const x1 = 0, y1 = 0, x2 = 1000, y2 = 1000;
        //impresion de derecha a izquierda
        dda(x1, y1, op, y2);
        dda(x1, y1, x2, op);
        op = op - 1
    }
    for (let i = 0; i < 1000; i++) {
        const x1 = 0, y1 = 0, x2 = 1000, y2 = 1000;
        //impresion de izquierda a derecha
        dda(x2, y2, i, y1);
        dda(x2, y2, x1, i)
    }
    var end = window.performance.now();
    console.log(`Execution time DDA: ${end - start} ms`);
}

function prueba2(){
    var start = window.performance.now();
    // Dibujar 1000 líneas horizontales con un pixel de diferencia izq a der
    for (let i = 0; i < 1000; i++) {
        const x1 = 0;
        const y1 = i;
        const x2 = 1000;
        const y2 = i;
        drawLine(x1, y1, x2, y2);
    }
    // Dibujar 1000 líneas horizontales con un pixel de diferencia der a izq
    for (let i = 0; i < 1000; i++) {
        const x1 = 0;
        const y1 = i;
        const x2 = 1000;
        const y2 = i;
        drawLine(x2, y2, x1, y1);
    }
    // Dibujar 1000 líneas verticales con un pixel de diferencia izq a der
    for (let i = 0; i < 1000; i++){
        const x1 = i;
        const y1 = 0;
        const x2 = i;
        const y2 = 1000;
        drawLine(x1, y1, x2, y2);
    }
    // Dibujar 1000 líneas verticales con un pixel de diferencia der a izq
    for (let i = 0; i < 1000; i++){
        const x1 = i;
        const y1 = 0;
        const x2 = i;
        const y2 = 1000;
        drawLine(x2, y2, x1, y1);
    }

    let op = 1000;
    //diagonales
    for (let i = 0; i < 1000; i++) {
        const x1 = 0, y1 = 0, x2 = 1000, y2 = 1000;
        //impresion de derecha a izquierda
        drawLine(x1, y1, op, y2);
        drawLine(x1, y1, x2, op);
        op = op - 1
    }
    for (let i = 0; i < 1000; i++) {
        const x1 = 0, y1 = 0, x2 = 1000, y2 = 1000;
        //impresion de izquierda a derecha
        drawLine(x2, y2, i, y1);
        drawLine(x2, y2, x1, i)
    }
    var end = window.performance.now();
    console.log(`Execution time drawLine: ${end - start} ms`);
}

function prueba3(){
    var start = window.performance.now();
    // Dibujar 1000 líneas horizontales con un pixel de diferencia izq a der
    for (let i = 0; i < 1000; i++) {
        const x1 = 0;
        const y1 = i;
        const x2 = 1000;
        const y2 = i;
        Bresenham(x1, y1, x2, y2);
    }
    // Dibujar 1000 líneas horizontales con un pixel de diferencia der a izq
    for (let i = 0; i < 1000; i++) {
        const x1 = 0;
        const y1 = i;
        const x2 = 1000;
        const y2 = i;
        Bresenham(x2, y2, x1, y1);
    }
    // Dibujar 1000 líneas verticales con un pixel de diferencia izq a der
    for (let i = 0; i < 1000; i++){
        const x1 = i;
        const y1 = 0;
        const x2 = i;
        const y2 = 1000;
        Bresenham(x1, y1, x2, y2);
    }
    // Dibujar 1000 líneas verticales con un pixel de diferencia der a izq
    for (let i = 0; i < 1000; i++){
        const x1 = i;
        const y1 = 0;
        const x2 = i;
        const y2 = 1000;
        Bresenham(x2, y2, x1, y1);
    }

    let op = 1000;
    //diagonales
    for (let i = 0; i < 1000; i++) {
        const x1 = 0, y1 = 0, x2 = 1000, y2 = 1000;
        //impresion de derecha a izquierda
        Bresenham(x1, y1, op, y2);
        Bresenham(x1, y1, x2, op);
        op = op - 1
    }
    for (let i = 0; i < 1000; i++) {
        const x1 = 0, y1 = 0, x2 = 1000, y2 = 1000;
        //impresion de izquierda a derecha
        Bresenham(x2, y2, i, y1);
        Bresenham(x2, y2, x1, i)
    }
    var end = window.performance.now();
    console.log(`Execution time Bresenham: ${end - start} ms`);
}
prueba()
prueba2()
prueba3()