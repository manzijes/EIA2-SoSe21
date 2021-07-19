namespace Football {

    export class Referee extends Moveable {
        
        private target: Vector;

        constructor(_position: Vector, _velocity: number) {
            super(_position, _velocity);
            this.position = _position;
            this.velocity = _velocity;
        }

        public draw(): void {

            crc2.save();
            crc2.translate(this.position.x, this.position.y);

            // body
            crc2.beginPath();
            crc2.fillStyle = "white";
            crc2.strokeStyle = "black";
            crc2.lineWidth = 3;
            crc2.arc(0, 0, 10, 0, 2 * Math.PI);
            crc2.stroke();
            crc2.fill();

            // stripes
            crc2.beginPath();
            crc2.rect(-7, -10, 3, 20);
            crc2.fillStyle = "black";
            crc2.fill();
            crc2.closePath();

            crc2.beginPath();
            crc2.rect(-1.5, -10, 3, 20);
            crc2.fillStyle = "black";
            crc2.fill();
            crc2.closePath();
            
            crc2.beginPath();
            crc2.rect(4, -10, 3, 20);
            crc2.fillStyle = "black";
            crc2.fill();
            crc2.closePath();

            crc2.restore();
            crc2.resetTransform();
        }

        public move(): void { 
            this.target = new Vector(football.position.x, football.position.y - 17);
            let direction: Vector = new Vector(this.target.x - this.position.x, this.target.y - this.position.y);

            direction.scale(this.velocity);
            this.position.add(direction);
        }
    }
}