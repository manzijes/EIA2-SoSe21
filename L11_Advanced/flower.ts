namespace L11_Advanced {

    export class Flower {
        public centerX: number;
        public centerY: number;
        public radius: number;
        public nPetals: number;
        public color: string;
        public fillrate: number;
        protected nectarAmount: number;

    constructor(centerX: number, centerY: number, radius: number, nPetals: number, color: string, fillrate: number) {
        this.centerX = centerX;
        this.centerY = centerY;
        this.radius = radius;
        this.nPetals = nPetals;
        this.color = color;
        this.fillrate = fillrate;
        this.nectarAmount = 0;
        }

        draw(): void {
            crc2.beginPath();
            crc2.moveTo(this.centerX, this.centerY);
            crc2.lineTo(this.centerX, this.centerY + 40);
            crc2.strokeStyle = "darkgreen";
            crc2.stroke();
            crc2.closePath();

            // draw nectar
            crc2.beginPath();
            crc2.fillStyle = "yellow";
            crc2.fillRect(this.centerX + 20, this.centerY + 40, 10, 0 - this.nectarAmount);
            crc2.closePath();
            
            // draw flower petals
            crc2.beginPath();
            for (let i: number = 0; i < this.nPetals; i++) {
                let theta1: number = ((Math.PI * 2) / this.nPetals) * (i + 1);
                let theta2: number = ((Math.PI * 2) / this.nPetals) * (i);

                let x1: number = (this.radius * Math.sin(theta1)) + this.centerX;
                let y1: number = (this.radius * Math.cos(theta1)) + this.centerY;
                let x2: number = (this.radius * Math.sin(theta2)) + this.centerX;
                let y2: number = (this.radius * Math.cos(theta2)) + this.centerY;

                crc2.moveTo(this.centerX, this.centerY);
                crc2.bezierCurveTo(x1, y1, x2, y2, this.centerX, this.centerY);
            }

            crc2.closePath();
            crc2.fillStyle = this.color;
            crc2.fill();

            // draw center
            crc2.beginPath();
            crc2.arc(this.centerX, this.centerY, this.radius / 5, 0, 2 * Math.PI, false);
            crc2.fillStyle = "#FFFF66";
            crc2.fill();
            crc2.strokeStyle = "whitesmoke";
            crc2.lineWidth = 1;
            crc2.stroke();
            crc2.closePath();
        }

        fillNectar(): void {
            if (this.nectarAmount < 40)
                this.nectarAmount += this.fillrate;
            this.draw();
        }

    }
}