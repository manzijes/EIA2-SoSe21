"use strict";
var L09_Classes;
(function (L09_Classes) {
    class Flower {
        constructor(centerX, centerY, radius, nPetals, color) {
            this.centerX = centerX;
            this.centerY = centerY;
            this.radius = radius;
            this.nPetals = nPetals;
            this.color = color;
        }
        draw() {
            L09_Classes.crc2.beginPath();
            L09_Classes.crc2.moveTo(this.centerX, this.centerY);
            L09_Classes.crc2.lineTo(this.centerX, this.centerY + 40);
            L09_Classes.crc2.strokeStyle = "darkgreen";
            L09_Classes.crc2.stroke();
            L09_Classes.crc2.closePath();
            // draw flower petals
            L09_Classes.crc2.beginPath();
            for (let i = 0; i < this.nPetals; i++) {
                let theta1 = ((Math.PI * 2) / this.nPetals) * (i + 1);
                let theta2 = ((Math.PI * 2) / this.nPetals) * (i);
                let x1 = (this.radius * Math.sin(theta1)) + this.centerX;
                let y1 = (this.radius * Math.cos(theta1)) + this.centerY;
                let x2 = (this.radius * Math.sin(theta2)) + this.centerX;
                let y2 = (this.radius * Math.cos(theta2)) + this.centerY;
                L09_Classes.crc2.moveTo(this.centerX, this.centerY);
                L09_Classes.crc2.bezierCurveTo(x1, y1, x2, y2, this.centerX, this.centerY);
            }
            L09_Classes.crc2.closePath();
            L09_Classes.crc2.fillStyle = this.color;
            L09_Classes.crc2.fill();
            // draw center
            L09_Classes.crc2.beginPath();
            L09_Classes.crc2.arc(this.centerX, this.centerY, this.radius / 5, 0, 2 * Math.PI, false);
            L09_Classes.crc2.fillStyle = "#FFFF66";
            L09_Classes.crc2.fill();
            L09_Classes.crc2.strokeStyle = "whitesmoke";
            L09_Classes.crc2.lineWidth = 1;
            L09_Classes.crc2.stroke();
        }
    }
    L09_Classes.Flower = Flower;
})(L09_Classes || (L09_Classes = {}));
//# sourceMappingURL=flower.js.map