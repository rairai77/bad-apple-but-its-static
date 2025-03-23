let { width, height } = myCanvas;
function resize() {
    myCanvas.width = window.innerWidth;
    myCanvas.height = window.innerHeight;
    width = myCanvas.width;
    height = myCanvas.height;
}

window.addEventListener("resize", resize, false);
resize();

const ctx = myCanvas.getContext("2d");

function animate() {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = "black";

    const radius = 100;
    // square to keep between 0 and 1 so that it doesn't go
    // off the left side
    const percent = Math.sin(Date.now() / 1000) ** 2;
    const x = lerp(radius, width - radius, percent);
    const y = height / 2;

    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fill();

    requestAnimationFrame(animate);
}

function lerp(a, b, t) {
    return a + (b - a) * t;
}
animate();
