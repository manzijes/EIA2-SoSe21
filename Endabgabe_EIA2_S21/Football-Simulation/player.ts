namespace Football {

    export class Player extends Moveable {

        public precision: number;
        public number: number;
        public target: Vector;
        public team: string;
        public inPossession: boolean = false;
        private color: string;
        private justPossessed: boolean = false;
        private perceptionRad: number = 110;
        private startingPosition: Vector;

        constructor(_position: Vector, _velocity: number, _color: string, _precision: number, _number: number, _team: string) {
            super(_position, _velocity);
            this.position = _position;
            this.velocity = _velocity;
            this.color = _color;
            this.precision = _precision;
            this.number = _number;
            this.team = _team;
            this.startingPosition = _position.copy();
        }

        public draw(): void {
            crc2.save();
            crc2.translate(this.position.x, this.position.y);

            // circle
            crc2.beginPath();
            crc2.fillStyle = this.color;
            crc2.strokeStyle = "white";
            crc2.lineWidth = 3;
            crc2.arc(0, 0, 10, 0, 2 * Math.PI);
            crc2.stroke();
            crc2.fill();
            crc2.closePath();
            crc2.restore();

            crc2.resetTransform();
        }

        public move(): void {
            this.target = football.position;
            let direction: Vector = new Vector(this.target.x - this.position.x, this.target.y - this.position.y);

            // if distance between player and ball (target) is above range of perception radius, return to starting Position
            if (direction.length > this.perceptionRad) {
                this.returnToStart();
            // if it IS in the range, run towards ball (target)
            } else {
                direction.scale(this.velocity);
                this.position.add(direction);
                // if ball has been reached by player, the player didn't just possess the ball and freeze is false
                if (!freeze && !this.justPossessed && this.position.x - 17 < this.target.x && this.position.x + 17 > this.target.x && this.position.y - 17 < this.target.y && this.position.y + 17 > this.target.y) {
                    console.log("reached");
                    // find the player who last possessed the ball and make the status justPossessed false again
                    for (let player of players) {
                        if (player.justPossessed) {
                            player.justPossessed = false;
                        }
                    }
                    // the player who just reached the ball is now in possession of it and is also the player who last possessed it
                    // the animation freezes and the ball gets stopped. 
                    //The players precision value is now the new precision value to use when the ball gets shot
                    this.inPossession = true;
                    this.justPossessed = true;
                    football.target = football.position;
                    freeze = true;
                    console.log("freeze");
                    currentPrecision = this.precision;
                }
            }
        }

        returnToStart(): void {
            this.target = this.startingPosition;
            let direction: Vector = new Vector(this.target.x - this.position.x, this.target.y - this.position.y);

            direction.scale(this.velocity);
            this.position.add(direction);
        }
    }
}