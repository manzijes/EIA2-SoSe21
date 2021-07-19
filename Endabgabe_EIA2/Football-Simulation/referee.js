"use strict";
var Football;
(function (Football) {
    class Referee extends Football.Moveable {
        constructor(_position, _velocity) {
            super(_position, _velocity);
            this.position = _position;
            this.velocity = _velocity;
        }
        draw() {
            Football.crc2.save();
            Football.crc2.translate(this.position.x, this.position.y);
            // body
            Football.crc2.beginPath();
            Football.crc2.fillStyle = "white";
            Football.crc2.strokeStyle = "black";
            Football.crc2.lineWidth = 3;
            Football.crc2.arc(0, 0, 10, 0, 2 * Math.PI);
            Football.crc2.stroke();
            Football.crc2.fill();
            // stripes
            Football.crc2.beginPath();
            Football.crc2.rect(-7, -10, 3, 20);
            Football.crc2.fillStyle = "black";
            Football.crc2.fill();
            Football.crc2.closePath();
            Football.crc2.beginPath();
            Football.crc2.rect(-1.5, -10, 3, 20);
            Football.crc2.fillStyle = "black";
            Football.crc2.fill();
            Football.crc2.closePath();
            Football.crc2.beginPath();
            Football.crc2.rect(4, -10, 3, 20);
            Football.crc2.fillStyle = "black";
            Football.crc2.fill();
            Football.crc2.closePath();
            Football.crc2.restore();
            Football.crc2.resetTransform();
        }
        move() {
            this.target = new Football.Vector(Football.football.position.x, Football.football.position.y - 17);
            let direction = new Football.Vector(this.target.x - this.position.x, this.target.y - this.position.y);
            direction.scale(this.velocity);
            this.position.add(direction);
        }
    }
    Football.Referee = Referee;
})(Football || (Football = {}));
//# sourceMappingURL=referee.js.map