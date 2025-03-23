const video = document.createElement("video");
video.src = "original.mp4";
video.muted = false;
video.play();

let { width, height } = myCanvas;
const ctx = myCanvas.getContext("2d", { willReadFrequently: true });
video.addEventListener("loadeddata", () => {
    myCanvas.width = video.videoWidth;
    myCanvas.height = video.videoHeight;
    width = myCanvas.width;
    height = myCanvas.height;

    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, width, height);
    animate();
});

let paused = false;
myCanvas.addEventListener("click", () => {
    paused = !paused;
    if (!paused) {
        animate();
        video.play();
    } else {
        video.pause();
    }
});

function animate() {
    const oldImageData = ctx.getImageData(0, 0, width, height);
    const oldData = oldImageData.data;

    ctx.drawImage(video, 0, 0, width, height);

    const newImageData = ctx.getImageData(0, 0, width, height);
    const newData = newImageData.data;

    for (let i = 0; i < newData.length; i += 4) {
        if (newData[i] === 0) {
            const randBW = Math.random() > 0.5 ? 255 : 0;
            newData[i] = randBW;
            newData[i + 1] = randBW;
            newData[i + 2] = randBW;
        } else {
            newData[i] = oldData[i];
            newData[i + 1] = oldData[i + 1];
            newData[i + 2] = oldData[i + 2];
        }
    }

    ctx.putImageData(newImageData, 0, 0);
    if (!paused) requestAnimationFrame(animate);
}
