namespace L09_Classes {

    export class Bee {
        public positionX: number;
        public positionY: number;
        public speedX: number;
        public speedY: number;
        public randomScale: number;

        constructor(_positionX: number, _positionY: number, _speedX: number, _speedY: number, _randomScale: number) {
            this.positionX = _positionX;
            this.positionY = _positionY;
            this.speedX = _speedX;
            this.speedY = _speedY;
            this.randomScale = _randomScale;
        }
    
        draw(): void {
            crc2.save();
            crc2.translate(this.positionX, this.positionY);
            crc2.scale(this.randomScale, this.randomScale);
           
            crc2.beginPath();
            crc2.moveTo(0, 0);
            crc2.ellipse(-10, -50, 30, 20,  Math.PI / 4, 0, Math.PI * 2, false);
            crc2.fillStyle = "lightblue";
            crc2.fill();
            crc2.strokeStyle = "whitesmoke";
            crc2.lineWidth = 2;
            crc2.stroke();
            crc2.closePath();
        
            crc2.beginPath();
            crc2.moveTo(0, 0);
            crc2.ellipse(0, 0, 50, 30, 0, 0, Math.PI * 2, false);
            crc2.fillStyle = "yellow";
            crc2.fill();
            crc2.closePath();
           
            crc2.beginPath();
            crc2.fillStyle = "black";
            crc2.moveTo(0, 0);
            crc2.fillRect(-20, -29, 7, 58);
            crc2.fillRect(-5, -29, 7, 58);
            crc2.fillRect(10, -29, 7, 58);
            crc2.closePath();
    
            crc2.beginPath();
            crc2.fillStyle = "black";
            crc2.arc(35, -5, 3 , 0, Math.PI * 2, false);
            crc2.fill();
            crc2.closePath();
        
            crc2.restore();
           
        }
     
        update(): void {
            if (this.positionX > crc2.canvas.width || this.positionX < 0) {
                this.speedX = -this.speedX;
            }

            if (this.positionY > crc2.canvas.height || this.positionY < 0) {
                this.speedY = -this.speedY;
            }

            this.positionX += this.speedX;
            this.positionY += this.speedY;
            this.draw();
        }
    }
}
    
    