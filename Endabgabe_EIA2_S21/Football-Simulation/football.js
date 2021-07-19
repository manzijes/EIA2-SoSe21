"use strict";
var Football;
(function (Football_1) {
    class Football extends Football_1.Moveable {
        constructor(_position, _velocity) {
            super(_position, _velocity);
            this.scoreTeamOne = 0;
            this.scoreTeamTwo = 0;
            this.target = _position.copy();
        }
        draw() {
            Football_1.crc2.save();
            Football_1.crc2.translate(this.position.x, this.position.y);
            // circle
            Football_1.crc2.beginPath();
            Football_1.crc2.arc(0, 0, 7, 0, 2 * Math.PI);
            Football_1.crc2.fillStyle = "white";
            Football_1.crc2.strokeStyle = "black";
            Football_1.crc2.lineWidth = 2;
            Football_1.crc2.stroke();
            Football_1.crc2.fill();
            Football_1.crc2.closePath();
            Football_1.crc2.restore();
            Football_1.crc2.resetTransform();
        }
        move() {
            // ball moves towards target
            let direction = new Football_1.Vector(this.target.x - this.position.x, this.target.y - this.position.y);
            direction.scale(this.velocity);
            this.position.add(direction);
            // if the ball rolls out of the field, it moves back in
            if (this.position.x <= 2) {
                console.log("out");
                this.target.x += 100;
            }
            if (this.position.y <= 2) {
                console.log("out");
                this.target.y += 100;
            }
            if (this.position.x >= 998) {
                console.log("out");
                this.target.x -= 100;
            }
            if (this.position.y >= 498) {
                console.log("out");
                this.target.y -= 100;
            }
            let scoreDOM = document.querySelector("#score");
            // if left goal is reached by ball
            if (this.position.x <= 22 && this.position.y >= (Football_1.canvas.height / 2) - 22 && this.position.y <= (Football_1.canvas.height / 2) + 22) {
                console.log("goal");
                this.position = new Football_1.Vector(Football_1.canvas.width / 2, Football_1.canvas.height / 2);
                this.target = new Football_1.Vector(Football_1.canvas.width / 2, Football_1.canvas.height / 2);
                this.scoreTeamTwo++;
                scoreDOM.innerHTML = "Score: " + this.scoreTeamOne + ":" + this.scoreTeamTwo;
                alert("Goal! That's a point for Team 2!");
            }
            // if right goal is reached by ball
            if (this.position.x >= Football_1.canvas.width - 22 && this.position.y >= (Football_1.canvas.height / 2) - 22 && this.position.y <= (Football_1.canvas.height / 2) + 22) {
                console.log("goal");
                this.position = new Football_1.Vector(Football_1.canvas.width / 2, Football_1.canvas.height / 2);
                this.target = new Football_1.Vector(Football_1.canvas.width / 2, Football_1.canvas.height / 2);
                this.scoreTeamOne++;
                scoreDOM.innerHTML = "Score: " + this.scoreTeamOne + ":" + this.scoreTeamTwo;
                alert("Amazing! Team 1 just scored a point!");
            }
        }
    }
    Football_1.Football = Football;
})(Football || (Football = {}));
//# sourceMappingURL=football.js.map