"use strict";
var L11_Advanced;
(function (L11_Advanced) {
    class Bee extends L11_Advanced.Moveable {
        constructor(_positionX, _positionY, _speedX, _speedY, _randomScale) {
            super();
            this.positionX = _positionX;
            this.positionY = _positionY;
            this.speedX = _speedX;
            this.speedY = _speedY;
            this.randomScale = _randomScale;
        }
        draw() {
            L11_Advanced.crc2.save();
            L11_Advanced.crc2.translate(this.positionX, this.positionY);
            L11_Advanced.crc2.scale(this.randomScale, this.randomScale);
            L11_Advanced.crc2.beginPath();
            L11_Advanced.crc2.moveTo(0, 0);
            L11_Advanced.crc2.ellipse(-10, -50, 30, 20, Math.PI / 4, 0, Math.PI * 2, false);
            L11_Advanced.crc2.fillStyle = "lightblue";
            L11_Advanced.crc2.fill();
            L11_Advanced.crc2.strokeStyle = "whitesmoke";
            L11_Advanced.crc2.lineWidth = 2;
            L11_Advanced.crc2.stroke();
            L11_Advanced.crc2.closePath();
            L11_Advanced.crc2.beginPath();
            L11_Advanced.crc2.moveTo(0, 0);
            L11_Advanced.crc2.ellipse(0, 0, 50, 30, 0, 0, Math.PI * 2, false);
            L11_Advanced.crc2.fillStyle = "yellow";
            L11_Advanced.crc2.fill();
            L11_Advanced.crc2.closePath();
            L11_Advanced.crc2.beginPath();
            L11_Advanced.crc2.fillStyle = "black";
            L11_Advanced.crc2.moveTo(0, 0);
            L11_Advanced.crc2.fillRect(-20, -29, 7, 58);
            L11_Advanced.crc2.fillRect(-5, -29, 7, 58);
            L11_Advanced.crc2.fillRect(10, -29, 7, 58);
            L11_Advanced.crc2.closePath();
            L11_Advanced.crc2.beginPath();
            L11_Advanced.crc2.fillStyle = "black";
            L11_Advanced.crc2.arc(35, -5, 3, 0, Math.PI * 2, false);
            L11_Advanced.crc2.fill();
            L11_Advanced.crc2.closePath();
            L11_Advanced.crc2.restore();
        }
        update() {
            if (this.positionX > L11_Advanced.crc2.canvas.width || this.positionX < 0) {
                this.speedX = -this.speedX;
            }
            if (this.positionY > L11_Advanced.crc2.canvas.height || this.positionY < 0) {
                this.speedY = -this.speedY;
            }
            this.positionX += this.speedX;
            this.positionY += this.speedY;
            this.draw();
        }
    }
    L11_Advanced.Bee = Bee;
})(L11_Advanced || (L11_Advanced = {}));
//# sourceMappingURL=bee.js.map