"use strict";
var L08_GenerativeArt;
(function (L08_GenerativeArt) {
    // install load listener on window
    window.addEventListener("load", handleLoad);
    // declare rendering context and refresh-button globally
    let crc2;
    let reloadBtn;
    // declare placeholder variable for background color
    let bgColor;
    function handleLoad() {
        // find refresh-button and install click listener
        reloadBtn = document.querySelector("#reloadBtn");
        reloadBtn.addEventListener("click", refresh);
        // find canvas
        let canvas = document.querySelector("canvas");
        if (!canvas)
            return;
        crc2 = canvas.getContext("2d");
        // draw background
        drawBackground();
        // call function to draw bubbles twice
        for (let i = 0; i < 2; i++) {
            drawBubbles();
        }
    }
    // draw background in either black or white
    function drawBackground() {
        let randomNumber = Math.floor(Math.random() * 3);
        if (randomNumber == 2) {
            bgColor = "whitesmoke";
        }
        else {
            bgColor = "black";
        }
        crc2.fillStyle = bgColor;
        crc2.fillRect(0, 0, crc2.canvas.width, crc2.canvas.height);
    }
    // draw bubbles
    function drawBubbles() {
        let circles = 200;
        let particle = new Path2D();
        particle.arc(0, 0, Math.random() * 60 + 40, 0, 2 * Math.PI);
        crc2.save();
        crc2.translate(0 * Math.random(), 0 * Math.random());
        crc2.fillStyle = generateRandomColor();
        crc2.fill();
        for (let drawnCircles = 0; drawnCircles < circles; drawnCircles++) {
            crc2.save();
            let x = Math.random() * 900 * 2;
            let y = Math.random() * 500 * 2;
            crc2.translate(x, y);
            crc2.fill(particle);
            crc2.restore();
        }
        crc2.restore();
    }
    // generate a color with random rgb values
    function generateRandomColor() {
        let r = Math.floor(Math.random() * 255);
        let g = Math.floor(Math.random() * 255);
        let b = Math.floor(Math.random() * 255);
        let opacity = Math.random() * 0.4 + 0.2;
        let color = "rgba(" + r + "," + g + "," + b + "," + opacity + ")";
        return color;
    }
    // refresh page
    function refresh() {
        window.location.reload();
    }
})(L08_GenerativeArt || (L08_GenerativeArt = {}));
//# sourceMappingURL=generativeArt.js.map