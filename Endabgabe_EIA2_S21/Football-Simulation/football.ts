namespace Football {

    export class Football extends Moveable {

        public target: Vector;
        private scoreTeamOne: number = 0;
        private scoreTeamTwo: number = 0;
        
        constructor(_position: Vector, _velocity: number) {
            super(_position, _velocity);
            this.target = _position.copy();
        }

        public draw(): void {
            crc2.save();
            crc2.translate(this.position.x, this.position.y);

            // circle
            crc2.beginPath();
            crc2.arc(0, 0, 7, 0, 2 * Math.PI);
            crc2.fillStyle = "white";
            crc2.strokeStyle = "black";
            crc2.lineWidth = 2;
            crc2.stroke();
            crc2.fill();
            crc2.closePath();
            crc2.restore();

            crc2.resetTransform();

        }

        public move(): void {

            // ball moves towards target
            let direction: Vector = new Vector(this.target.x - this.position.x, this.target.y - this.position.y);
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

            let scoreDOM: HTMLElement = <HTMLElement>document.querySelector("#score");

            // if left goal is reached by ball
            if (this.position.x <= 22 && this.position.y >= (canvas.height / 2) - 22 && this.position.y <= (canvas.height / 2) + 22) {
                console.log("goal");
                this.position = new Vector (canvas.width / 2, canvas.height / 2);
                this.target = new Vector (canvas.width / 2, canvas.height / 2);
                this.scoreTeamTwo++;
                scoreDOM.innerHTML = "Score: " + this.scoreTeamOne + ":" + this.scoreTeamTwo;
                alert ("Goal! That's a point for Team 2!");
            }

            // if right goal is reached by ball
            if (this.position.x >= canvas.width - 22 && this.position.y >= (canvas.height / 2) - 22 && this.position.y <= (canvas.height / 2) + 22) {
                console.log("goal");
                this.position = new Vector(canvas.width / 2, canvas.height / 2);
                this.target = new Vector(canvas.width / 2, canvas.height / 2);
                this.scoreTeamOne++;
                scoreDOM.innerHTML = "Score: " + this.scoreTeamOne + ":" + this.scoreTeamTwo;
                alert("Amazing! Team 1 just scored a point!");
            }

        }

    }
}