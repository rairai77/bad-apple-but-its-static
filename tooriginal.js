const video = document.createElement("video");
video.src = "static.mov";
video.muted = true;
video.play();

let { width, height } = myCanvas;
const ctx = myCanvas.getContext("2d", { willReadFrequently: true });

const offscreenCanvas = document.createElement("canvas");
const offCtx = offscreenCanvas.getContext("2d", { willReadFrequently: true });
video.addEventListener("loadeddata", () => {
    myCanvas.width = video.videoWidth;
    myCanvas.height = video.videoHeight;
    width = myCanvas.width;
    height = myCanvas.height;
    offscreenCanvas.width = width;
    offscreenCanvas.height = height;

    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, width, height);
    animate();
});

let paused = false;
myCanvas.addEventListener("click", () => {
    paused = !paused;
    if (!paused) {
        video.play();
        animate();
    } else {
        video.pause();
    }
});
const FPS = 60;

function animate() {
    offCtx.drawImage(video, 0, 0, width, height);
    const currentFrameData = offCtx.getImageData(0, 0, width, height).data;

    if (prevFrame) {
        const imageData = ctx.createImageData(width, height);
        const output = imageData.data;
        let diffPixelsCount = 0;
        for (let i = 0; i < currentFrameData.length; i += 4) {
            const isDifferent = currentFrameData[i] !== prevFrame[i];
            if (isDifferent) {
                diffPixelsCount++;
            }
            output[i] = isDifferent ? 0 : 255;
            output[i + 1] = isDifferent ? 0 : 255;
            output[i + 2] = isDifferent ? 0 : 255;
            output[i + 3] = 255;
        }
        // const copy = new Uint8ClampedArray(output);
        // function isBlackAt(x, y) {
        //     const index = (y * width + x) * 4;
        //     return copy[index] === 0;
        // }
        // for (let y = 0; y < height; y++) {
        //     for (let x = 0; x < width; x++) {
        //         if (isBlackAt(x, y)) {
        //             const neighbors = [
        //                 isBlackAt(x, y - 1),
        //                 isBlackAt(x - 1, y),
        //                 isBlackAt(x + 1, y),
        //                 isBlackAt(x, y + 1),
        //             ];
        //             const sum = neighbors.reduce((acc, val) => acc + val, 0);
        //             if (sum < 2) {
        //                 output[(y * width + x) * 4] = 255;
        //                 output[(y * width + x) * 4 + 1] = 255;
        //                 output[(y * width + x) * 4 + 2] = 255;
        //             }
        //             if (sum > 2) {
        //                 output[(y * width + x) * 4] = 0;
        //                 output[(y * width + x) * 4 + 1] = 0;
        //                 output[(y * width + x) * 4 + 2] = 0;
        //             }
        //         }
        //     }
        // }
        if (diffPixelsCount > width * height * 0.05) {
            ctx.putImageData(imageData, 0, 0);
        }
    }

    prevFrame = new Uint8ClampedArray(currentFrameData);

    if (!paused) {
        requestAnimationFrame(animate);
    }
}

let prevFrame = null;
