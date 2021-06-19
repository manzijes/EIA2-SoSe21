"use strict";
var L11_Advanced;
(function (L11_Advanced) {
    class Flower {
        constructor(centerX, centerY, radius, nPetals, color, fillrate) {
            this.centerX = centerX;
            this.centerY = centerY;
            this.radius = radius;
            this.nPetals = nPetals;
            this.color = color;
            this.fillrate = fillrate;
            this.nectarAmount = 0;
        }
        draw() {
            L11_Advanced.crc2.beginPath();
            L11_Advanced.crc2.moveTo(this.centerX, this.centerY);
            L11_Advanced.crc2.lineTo(this.centerX, this.centerY + 40);
            L11_Advanced.crc2.strokeStyle = "darkgreen";
            L11_Advanced.crc2.stroke();
            L11_Advanced.crc2.closePath();
            // draw nectar
            L11_Advanced.crc2.beginPath();
            L11_Advanced.crc2.fillStyle = "yellow";
            L11_Advanced.crc2.fillRect(this.centerX + 20, this.centerY + 40, 10, 0 - this.nectarAmount);
            L11_Advanced.crc2.closePath();
            // draw flower petals
            L11_Advanced.crc2.beginPath();
            for (let i = 0; i < this.nPetals; i++) {
                let theta1 = ((Math.PI * 2) / this.nPetals) * (i + 1);
                let theta2 = ((Math.PI * 2) / this.nPetals) * (i);
                let x1 = (this.radius * Math.sin(theta1)) + this.centerX;
                let y1 = (this.radius * Math.cos(theta1)) + this.centerY;
                let x2 = (this.radius * Math.sin(theta2)) + this.centerX;
                let y2 = (this.radius * Math.cos(theta2)) + this.centerY;
                L11_Advanced.crc2.moveTo(this.centerX, this.centerY);
                L11_Advanced.crc2.bezierCurveTo(x1, y1, x2, y2, this.centerX, this.centerY);
            }
            L11_Advanced.crc2.closePath();
            L11_Advanced.crc2.fillStyle = this.color;
            L11_Advanced.crc2.fill();
            // draw center
            L11_Advanced.crc2.beginPath();
            L11_Advanced.crc2.arc(this.centerX, this.centerY, this.radius / 5, 0, 2 * Math.PI, false);
            L11_Advanced.crc2.fillStyle = "#FFFF66";
            L11_Advanced.crc2.fill();
            L11_Advanced.crc2.strokeStyle = "whitesmoke";
            L11_Advanced.crc2.lineWidth = 1;
            L11_Advanced.crc2.stroke();
            L11_Advanced.crc2.closePath();
        }
        fillNectar() {
            if (this.nectarAmount < 40)
                this.nectarAmount += this.fillrate;
            this.draw();
        }
    }
    L11_Advanced.Flower = Flower;
})(L11_Advanced || (L11_Advanced = {}));
//# sourceMappingURL=flower.js.map