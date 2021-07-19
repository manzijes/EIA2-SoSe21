namespace Football {

    export class Linesman extends Moveable {

        private target: Vector;

        constructor(_position: Vector, _velocity: number) {
            super(_position, _velocity);
            this.position = _position;
            this.velocity = _velocity;
        }

        public draw(): void {

            crc2.save();
            crc2.translate(this.position.x, this.position.y);

            // circle
            crc2.beginPath();
            crc2.fillStyle = "white";
            crc2.strokeStyle = "black";
            crc2.lineWidth = 2;
            crc2.arc(0, 0, 10, 0, 2 * Math.PI);
            crc2.stroke();
            crc2.fill();
            //line
            crc2.fillStyle = "black";
            crc2.fillRect(-1.5, -10, 3, 20);
            crc2.restore();
            crc2.closePath();

            crc2.resetTransform();
        }

        public move(): void { 
            // make the target the position of the football
            this.target = football.position;
            // get difference between target position and current position, but only the x value
            let direction: Vector = new Vector(this.target.x - this.position.x, 0);
            // multiply with velocity
            direction.scale(this.velocity);
            // add difference to current position
            this.position.add(direction);
        }
    }
}