"use strict";
var Football;
(function (Football) {
    class Linesman extends Football.Moveable {
        constructor(_position, _velocity) {
            super(_position, _velocity);
            this.position = _position;
            this.velocity = _velocity;
        }
        draw() {
            Football.crc2.save();
            Football.crc2.translate(this.position.x, this.position.y);
            // circle
            Football.crc2.beginPath();
            Football.crc2.fillStyle = "white";
            Football.crc2.strokeStyle = "black";
            Football.crc2.lineWidth = 2;
            Football.crc2.arc(0, 0, 10, 0, 2 * Math.PI);
            Football.crc2.stroke();
            Football.crc2.fill();
            //line
            Football.crc2.fillStyle = "black";
            Football.crc2.fillRect(-1.5, -10, 3, 20);
            Football.crc2.restore();
            Football.crc2.closePath();
            Football.crc2.resetTransform();
        }
        move() {
            this.target = Football.football.position;
            let direction = new Football.Vector(this.target.x - this.position.x, 0);
            direction.scale(this.velocity);
            this.position.add(direction);
        }
    }
    Football.Linesman = Linesman;
})(Football || (Football = {}));
//# sourceMappingURL=linesman.js.map