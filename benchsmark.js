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
