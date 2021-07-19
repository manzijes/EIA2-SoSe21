"use strict";
var Football;
(function (Football) {
    class Player extends Football.Moveable {
        constructor(_position, _velocity, _color, _precision, _number, _team) {
            super(_position, _velocity);
            this.inPossession = false;
            this.justPossessed = false;
            this.perceptionRad = 110;
            this.position = _position;
            this.velocity = _velocity;
            this.color = _color;
            this.precision = _precision;
            this.number = _number;
            this.team = _team;
            this.startingPosition = _position.copy();
        }
        draw() {
            Football.crc2.save();
            Football.crc2.translate(this.position.x, this.position.y);
            // circle
            Football.crc2.beginPath();
            Football.crc2.fillStyle = this.color;
            Football.crc2.strokeStyle = "white";
            Football.crc2.lineWidth = 3;
            Football.crc2.arc(0, 0, 10, 0, 2 * Math.PI);
            Football.crc2.stroke();
            Football.crc2.fill();
            Football.crc2.closePath();
            Football.crc2.restore();
            Football.crc2.resetTransform();
        }
        move() {
            this.target = Football.football.position;
            let direction = new Football.Vector(this.target.x - this.position.x, this.target.y - this.position.y);
            // if distance between player and ball (target) is above range of perception radius, return to starting Position
            if (direction.length > this.perceptionRad) {
                this.returnToStart();
                // if it IS in the range, run towards ball (target)
            }
            else {
                direction.scale(this.velocity);
                this.position.add(direction);
                // if ball has been reached by player, the player didn't just possess the ball and freeze is false
                if (!Football.freeze && !this.justPossessed && this.position.x - 17 < this.target.x && this.position.x + 17 > this.target.x && this.position.y - 17 < this.target.y && this.position.y + 17 > this.target.y) {
                    console.log("reached");
                    // find the player who last possessed the ball and make the status justPossessed false again
                    for (let player of Football.players) {
                        if (player.justPossessed) {
                            player.justPossessed = false;
                        }
                    }
                    // the player who just reached the ball is now in possession of it and is also the player who last possessed it
                    // the animation freezes and the ball gets stopped. 
                    //The players precision value is now the new precision value to use when the ball gets shot
                    this.inPossession = true;
                    this.justPossessed = true;
                    Football.football.target = Football.football.position;
                    Football.freeze = true;
                    console.log("freeze");
                    Football.currentPrecision = this.precision;
                }
            }
        }
        returnToStart() {
            // make the starting position of the player their new target
            this.target = this.startingPosition;
            // get difference between current position and target
            let direction = new Football.Vector(this.target.x - this.position.x, this.target.y - this.position.y);
            // scale direction with velocity
            direction.scale(this.velocity);
            // add direction to the position
            this.position.add(direction);
        }
    }
    Football.Player = Player;
})(Football || (Football = {}));
//# sourceMappingURL=player.js.map