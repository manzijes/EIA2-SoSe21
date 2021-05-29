"use strict";
var L09_Classes;
(function (L09_Classes) {
    class Bee {
        constructor(_positionX, _positionY, _speedX, _speedY, _randomScale) {
            this.positionX = _positionX;
            this.positionY = _positionY;
            this.speedX = _speedX;
            this.speedY = _speedY;
            this.randomScale = _randomScale;
        }
        draw() {
            L09_Classes.crc2.save();
            L09_Classes.crc2.translate(this.positionX, this.positionY);
            L09_Classes.crc2.scale(this.randomScale, this.randomScale);
            L09_Classes.crc2.beginPath();
            L09_Classes.crc2.moveTo(0, 0);
            L09_Classes.crc2.ellipse(-10, -50, 30, 20, Math.PI / 4, 0, Math.PI * 2, false);
            L09_Classes.crc2.fillStyle = "lightblue";
            L09_Classes.crc2.fill();
            L09_Classes.crc2.strokeStyle = "whitesmoke";
            L09_Classes.crc2.lineWidth = 2;
            L09_Classes.crc2.stroke();
            L09_Classes.crc2.closePath();
            L09_Classes.crc2.beginPath();
            L09_Classes.crc2.moveTo(0, 0);
            L09_Classes.crc2.ellipse(0, 0, 50, 30, 0, 0, Math.PI * 2, false);
            L09_Classes.crc2.fillStyle = "yellow";
            L09_Classes.crc2.fill();
            L09_Classes.crc2.closePath();
            L09_Classes.crc2.beginPath();
            L09_Classes.crc2.fillStyle = "black";
            L09_Classes.crc2.moveTo(0, 0);
            L09_Classes.crc2.fillRect(-20, -29, 7, 58);
            L09_Classes.crc2.fillRect(-5, -29, 7, 58);
            L09_Classes.crc2.fillRect(10, -29, 7, 58);
            L09_Classes.crc2.closePath();
            L09_Classes.crc2.beginPath();
            L09_Classes.crc2.fillStyle = "black";
            L09_Classes.crc2.arc(35, -5, 3, 0, Math.PI * 2, false);
            L09_Classes.crc2.fill();
            L09_Classes.crc2.closePath();
            L09_Classes.crc2.restore();
        }
        update() {
            if (this.positionX > L09_Classes.crc2.canvas.width || this.positionX < 0) {
                this.speedX = -this.speedX;
            }
            if (this.positionY > L09_Classes.crc2.canvas.height || this.positionY < 0) {
                this.speedY = -this.speedY;
            }
            this.positionX += this.speedX;
            this.positionY += this.speedY;
            this.draw();
        }
    }
    L09_Classes.Bee = Bee;
})(L09_Classes || (L09_Classes = {}));
//# sourceMappingURL=bee.js.map