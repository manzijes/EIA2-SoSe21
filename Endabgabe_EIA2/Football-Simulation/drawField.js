"use strict";
var Football;
(function (Football) {
    function drawField() {
        //outer lines
        Football.crc2.beginPath();
        Football.crc2.rect(0, 0, Football.canvas.width, Football.canvas.height);
        Football.crc2.fillStyle = "#2e8b57";
        Football.crc2.fill();
        Football.crc2.rect(5, 5, Football.canvas.width - 10, Football.canvas.height - 10);
        Football.crc2.lineWidth = 1;
        Football.crc2.strokeStyle = "white";
        Football.crc2.stroke();
        Football.crc2.closePath();
        //middle line
        Football.crc2.beginPath();
        Football.crc2.moveTo(Football.canvas.width / 2, 5);
        Football.crc2.lineTo(Football.canvas.width / 2, Football.canvas.height - 5);
        Football.crc2.stroke();
        Football.crc2.closePath();
        //circle
        Football.crc2.beginPath();
        Football.crc2.arc(Football.canvas.width / 2, Football.canvas.height / 2, 70, 0, 2 * Math.PI, false);
        Football.crc2.stroke();
        Football.crc2.closePath();
        //left goal line
        Football.crc2.beginPath();
        Football.crc2.rect(5, (Football.canvas.height - 146) / 2, 44, 146);
        Football.crc2.stroke();
        Football.crc2.closePath();
        //left goal 
        Football.crc2.beginPath();
        Football.crc2.moveTo(18, 250 - 22);
        Football.crc2.lineTo(18, 250 + 22);
        Football.crc2.lineTo(0, 250 + 22);
        Football.crc2.lineTo(0, 250 - 22);
        Football.crc2.lineTo(10, 250 - 22);
        Football.crc2.fillStyle = "white";
        Football.crc2.fill();
        Football.crc2.closePath();
        //right goal line
        Football.crc2.beginPath();
        Football.crc2.rect(Football.canvas.width - 44, (Football.canvas.height - 146) / 2, 39, 146);
        Football.crc2.stroke();
        Football.crc2.closePath();
        //right goal 
        Football.crc2.beginPath();
        Football.crc2.moveTo(Football.canvas.width - 18, (Football.canvas.height / 2) - 22);
        Football.crc2.lineTo(Football.canvas.width - 18, (Football.canvas.height / 2) + 22);
        Football.crc2.lineTo(Football.canvas.width, (Football.canvas.height / 2) + 22);
        Football.crc2.lineTo(Football.canvas.width, (Football.canvas.height / 2) - 22);
        Football.crc2.lineTo(Football.canvas.width - 10, (Football.canvas.height / 2) - 22);
        Football.crc2.fillStyle = "white";
        Football.crc2.fill();
        Football.crc2.closePath();
        //save in imageData for animation
        Football.imageData = Football.crc2.getImageData(0, 0, Football.canvas.width, Football.canvas.height);
    }
    Football.drawField = drawField;
})(Football || (Football = {}));
//# sourceMappingURL=drawField.js.map