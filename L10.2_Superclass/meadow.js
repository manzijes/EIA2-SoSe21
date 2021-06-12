"use strict";
var L10_Super;
(function (L10_Super) {
    // install load listener on window, declare global variables
    window.addEventListener("load", handleLoad);
    let reloadBtn;
    let height = 0;
    let width = 0;
    let flowers = [];
    let moveables = [];
    let imgData;
    function handleLoad() {
        // find refresh-button and install click listener
        reloadBtn = document.querySelector("#reloadBtn");
        reloadBtn.addEventListener("click", refresh);
        // find canvas
        let canvas = document.querySelector("canvas");
        if (!canvas)
            return;
        L10_Super.crc2 = canvas.getContext("2d");
        height = canvas.height;
        width = canvas.width;
        // call functions to draw background and grass field
        drawBackground();
        drawSun();
        drawMountains();
        drawGrass();
        // create flower 20 times
        for (let i = 0; i < 20; i++) {
            // define flower properties
            let centerX = Math.random() * canvas.width + 0;
            let centerY = Math.random() * canvas.height + (canvas.height / 2);
            let radius = 40;
            let color = generateRandomColor();
            let flower = new L10_Super.Flower(centerX, centerY, radius, 5, color);
            flowers.push(flower);
        }
        drawFlowers();
        imgData = L10_Super.crc2.getImageData(0, 0, canvas.width, canvas.height);
        // create bee 5 times
        for (let i = 0; i < 5; i++) {
            let randomSpeedX = (Math.random() - 1) * 4;
            let randomSpeedY = (Math.random() - 0.6) * 4;
            let randomScale = 0.5 + Math.random() * (1.2 - 1);
            let bee = new L10_Super.Bee(canvas.width * 0.5, canvas.height * 0.5, randomSpeedX, randomSpeedY, randomScale);
            moveables.push(bee);
        }
        drawMoveables();
        update();
    }
    // call draw method on all flowers
    function drawFlowers() {
        for (let i = 0; i < flowers.length; i++) {
            flowers[i].draw();
        }
    }
    // call draw method on all moveables
    function drawMoveables() {
        for (let i = 0; i < moveables.length; i++) {
            moveables[i].draw();
        }
    }
    // animate
    function update() {
        requestAnimationFrame(update);
        L10_Super.crc2.clearRect(0, 0, L10_Super.crc2.canvas.width, L10_Super.crc2.canvas.height);
        L10_Super.crc2.putImageData(imgData, 0, 0);
        for (let i = 0; i < moveables.length; i++) {
            moveables[i].update();
        }
    }
    // draw background
    function drawBackground() {
        let gradient = L10_Super.crc2.createLinearGradient(0, 0, 0, L10_Super.crc2.canvas.height);
        gradient.addColorStop(0, "skyblue");
        gradient.addColorStop(0.6, "white");
        L10_Super.crc2.fillStyle = gradient;
        L10_Super.crc2.fillRect(0, 0, L10_Super.crc2.canvas.width, L10_Super.crc2.canvas.height);
    }
    // draw grass
    function drawGrass() {
        L10_Super.crc2.fillStyle = "cadetblue";
        L10_Super.crc2.fillRect(0, (L10_Super.crc2.canvas.height / 2), L10_Super.crc2.canvas.width, (L10_Super.crc2.canvas.height / 2));
    }
    // generate a color with random rgb values
    function generateRandomColor() {
        let r = Math.floor(Math.random() * 255);
        let g = Math.floor(Math.random() * 255);
        let b = Math.floor(Math.random() * 255);
        let color = "rgba(" + r + "," + g + "," + b + "," + 1 + ")";
        return color;
    }
    // refresh page (called by click on refresh button)
    function refresh() {
        window.location.reload();
    }
    // draw part of background, mountains
    function drawMountains() {
        L10_Super.crc2.beginPath();
        let gradient = L10_Super.crc2.createLinearGradient(0, 0, 0, L10_Super.crc2.canvas.height);
        gradient.addColorStop(0, "whitesmoke");
        gradient.addColorStop(0.5, "darkslategrey");
        L10_Super.crc2.fillStyle = gradient;
        L10_Super.crc2.moveTo(500, 500);
        L10_Super.crc2.quadraticCurveTo(100, -100, -200, 500);
        L10_Super.crc2.moveTo(1500, 500);
        L10_Super.crc2.quadraticCurveTo(700, -200, 300, 500);
        L10_Super.crc2.fill();
        L10_Super.crc2.strokeStyle = "whitesmoke";
        L10_Super.crc2.lineWidth = 2;
        L10_Super.crc2.stroke();
        L10_Super.crc2.closePath();
    }
    // draw sun in random location in the sky
    function drawSun() {
        L10_Super.crc2.beginPath();
        L10_Super.crc2.arc(Math.random() * width + 100, height / 4, 100, 0, 2 * Math.PI);
        L10_Super.crc2.fillStyle = "#FFFF66";
        L10_Super.crc2.fill();
        L10_Super.crc2.closePath();
    }
})(L10_Super || (L10_Super = {}));
//# sourceMappingURL=meadow.js.map