namespace Football {
    
    export function drawField(): void {
        //outer lines
        crc2.beginPath();
        crc2.rect(0, 0, canvas.width, canvas.height);
        crc2.fillStyle = "#2e8b57";
        crc2.fill();
        crc2.rect(5, 5, canvas.width - 10, canvas.height - 10);
        crc2.lineWidth = 1;
        crc2.strokeStyle = "white";
        crc2.stroke();
        crc2.closePath();

        //middle line
        crc2.beginPath();
        crc2.moveTo(canvas.width / 2, 5);
        crc2.lineTo(canvas.width / 2, canvas.height - 5);
        crc2.stroke();
        crc2.closePath();
        
        //circle
        crc2.beginPath();
        crc2.arc(canvas.width / 2, canvas.height / 2, 70, 0, 2 * Math.PI, false);
        crc2.stroke();
        crc2.closePath();

        //left goal line
        crc2.beginPath();
        crc2.rect(5, (canvas.height - 146) / 2, 44, 146);
        crc2.stroke();
        crc2.closePath();

        //left goal 
        crc2.beginPath();
        crc2.moveTo(18, 250 - 22);
        crc2.lineTo(18, 250 + 22);
        crc2.lineTo(0, 250 + 22);
        crc2.lineTo(0, 250 - 22);
        crc2.lineTo(10, 250 - 22);
        crc2.fillStyle = "white";
        crc2.fill();
        crc2.closePath();

        //right goal line
        crc2.beginPath();
        crc2.rect(canvas.width - 44, (canvas.height - 146) / 2, 39, 146);
        crc2.stroke();
        crc2.closePath();

        //right goal 
        crc2.beginPath();
        crc2.moveTo(canvas.width - 18, (canvas.height / 2) - 22);
        crc2.lineTo(canvas.width - 18, (canvas.height / 2) + 22);
        crc2.lineTo(canvas.width, (canvas.height / 2) + 22);
        crc2.lineTo(canvas.width, (canvas.height / 2) - 22);
        crc2.lineTo(canvas.width - 10, (canvas.height / 2) - 22);
        crc2.fillStyle = "white";
        crc2.fill();
        crc2.closePath();

        //save in imageData for animation
        imageData = crc2.getImageData(0, 0, canvas.width, canvas.height);
    }
}