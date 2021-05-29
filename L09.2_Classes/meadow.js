"use strict";
var L09_Classes;
(function (L09_Classes) {
    // install load listener on window, declare global variables
    window.addEventListener("load", handleLoad);
    let reloadBtn;
    let height = 0;
    let width = 0;
    let flowers = [];
    let bees = [];
    let imgData;
    function handleLoad() {
        // find refresh-button and install click listener
        reloadBtn = document.querySelector("#reloadBtn");
        reloadBtn.addEventListener("click", refresh);
        // find canvas
        let canvas = document.querySelector("canvas");
        if (!canvas)
            return;
        L09_Classes.crc2 = canvas.getContext("2d");
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
            let flower = new L09_Classes.Flower(centerX, centerY, radius, 5, color);
            flowers.push(flower);
        }
        drawFlowers();
        imgData = L09_Classes.crc2.getImageData(0, 0, canvas.width, canvas.height);
        // create bee 5 times
        for (let i = 0; i < 5; i++) {
            let randomSpeedX = (Math.random() - 1) * 4;
            let randomSpeedY = (Math.random() - 0.6) * 4;
            let randomScale = 0.5 + Math.random() * (1.2 - 1);
            let bee = new L09_Classes.Bee(canvas.width * 0.5, canvas.height * 0.5, randomSpeedX, randomSpeedY, randomScale);
            bees.push(bee);
        }
        drawBees();
        update();
    }
    // call draw method on all flowers
    function drawFlowers() {
        for (let i = 0; i < flowers.length; i++) {
            flowers[i].draw();
        }
    }
    // call draw method on all bees
    function drawBees() {
        for (let i = 0; i < bees.length; i++) {
            bees[i].draw();
        }
    }
    // animate
    function update() {
        requestAnimationFrame(update);
        L09_Classes.crc2.clearRect(0, 0, L09_Classes.crc2.canvas.width, L09_Classes.crc2.canvas.height);
        L09_Classes.crc2.putImageData(imgData, 0, 0);
        for (let i = 0; i < bees.length; i++) {
            bees[i].update();
        }
    }
    // draw background
    function drawBackground() {
        let gradient = L09_Classes.crc2.createLinearGradient(0, 0, 0, L09_Classes.crc2.canvas.height);
        gradient.addColorStop(0, "skyblue");
        gradient.addColorStop(0.6, "white");
        L09_Classes.crc2.fillStyle = gradient;
        L09_Classes.crc2.fillRect(0, 0, L09_Classes.crc2.canvas.width, L09_Classes.crc2.canvas.height);
    }
    // draw grass
    function drawGrass() {
        L09_Classes.crc2.fillStyle = "cadetblue";
        L09_Classes.crc2.fillRect(0, (L09_Classes.crc2.canvas.height / 2), L09_Classes.crc2.canvas.width, (L09_Classes.crc2.canvas.height / 2));
    }
    // generate a color with random rgb values
    function generateRandomColor() {
        let r = Math.floor(Math.random() * 255);
        let g = Math.floor(Math.random() * 255);
        let b = Math.floor(Math.random() * 255);
        let color = "rgba(" + r + "," + g + "," + b + "," + 1 + ")";
        return color;
    }
    // refresh page
    function refresh() {
        window.location.reload();
    }
    // draw part of background, mountains
    function drawMountains() {
        L09_Classes.crc2.beginPath();
        let gradient = L09_Classes.crc2.createLinearGradient(0, 0, 0, L09_Classes.crc2.canvas.height);
        gradient.addColorStop(0, "whitesmoke");
        gradient.addColorStop(0.5, "darkslategrey");
        L09_Classes.crc2.fillStyle = gradient;
        L09_Classes.crc2.moveTo(500, 500);
        L09_Classes.crc2.quadraticCurveTo(100, -100, -200, 500);
        L09_Classes.crc2.moveTo(1500, 500);
        L09_Classes.crc2.quadraticCurveTo(700, -200, 300, 500);
        L09_Classes.crc2.fill();
        L09_Classes.crc2.strokeStyle = "whitesmoke";
        L09_Classes.crc2.lineWidth = 2;
        L09_Classes.crc2.stroke();
        L09_Classes.crc2.closePath();
    }
    // draw sun in random location in the sky
    function drawSun() {
        L09_Classes.crc2.beginPath();
        L09_Classes.crc2.arc(Math.random() * width + 100, height / 4, 100, 0, 2 * Math.PI);
        L09_Classes.crc2.fillStyle = "#FFFF66";
        L09_Classes.crc2.fill();
        L09_Classes.crc2.closePath();
    }
})(L09_Classes || (L09_Classes = {}));
//# sourceMappingURL=meadow.js.map