"use strict";
var L10_Super;
(function (L10_Super) {
    class Bee extends L10_Super.Moveable {
        constructor(_positionX, _positionY, _speedX, _speedY, _randomScale) {
            super();
            this.positionX = _positionX;
            this.positionY = _positionY;
            this.speedX = _speedX;
            this.speedY = _speedY;
            this.randomScale = _randomScale;
        }
        draw() {
            L10_Super.crc2.save();
            L10_Super.crc2.translate(this.positionX, this.positionY);
            L10_Super.crc2.scale(this.randomScale, this.randomScale);
            L10_Super.crc2.beginPath();
            L10_Super.crc2.moveTo(0, 0);
            L10_Super.crc2.ellipse(-10, -50, 30, 20, Math.PI / 4, 0, Math.PI * 2, false);
            L10_Super.crc2.fillStyle = "lightblue";
            L10_Super.crc2.fill();
            L10_Super.crc2.strokeStyle = "whitesmoke";
            L10_Super.crc2.lineWidth = 2;
            L10_Super.crc2.stroke();
            L10_Super.crc2.closePath();
            L10_Super.crc2.beginPath();
            L10_Super.crc2.moveTo(0, 0);
            L10_Super.crc2.ellipse(0, 0, 50, 30, 0, 0, Math.PI * 2, false);
            L10_Super.crc2.fillStyle = "yellow";
            L10_Super.crc2.fill();
            L10_Super.crc2.closePath();
            L10_Super.crc2.beginPath();
            L10_Super.crc2.fillStyle = "black";
            L10_Super.crc2.moveTo(0, 0);
            L10_Super.crc2.fillRect(-20, -29, 7, 58);
            L10_Super.crc2.fillRect(-5, -29, 7, 58);
            L10_Super.crc2.fillRect(10, -29, 7, 58);
            L10_Super.crc2.closePath();
            L10_Super.crc2.beginPath();
            L10_Super.crc2.fillStyle = "black";
            L10_Super.crc2.arc(35, -5, 3, 0, Math.PI * 2, false);
            L10_Super.crc2.fill();
            L10_Super.crc2.closePath();
            L10_Super.crc2.restore();
        }
        update() {
            if (this.positionX > L10_Super.crc2.canvas.width || this.positionX < 0) {
                this.speedX = -this.speedX;
            }
            if (this.positionY > L10_Super.crc2.canvas.height || this.positionY < 0) {
                this.speedY = -this.speedY;
            }
            this.positionX += this.speedX;
            this.positionY += this.speedY;
            this.draw();
        }
    }
    L10_Super.Bee = Bee;
})(L10_Super || (L10_Super = {}));
//# sourceMappingURL=bee.js.map