namespace L08_MeadowCanvas {

    // install load listener on window
    window.addEventListener("load", handleLoad);
    // declare rendering crc2 and refresh-button globally
    let crc2: CanvasRenderingContext2D;
    let reloadBtn: HTMLButtonElement;
    let height: number = 0;
    let width: number = 0;

    function handleLoad(): void {
        // find refresh-button and install click listener
        reloadBtn = <HTMLButtonElement>document.querySelector("#reloadBtn");
        reloadBtn.addEventListener("click", refresh);

        // find canvas
        let canvas: HTMLCanvasElement | null = document.querySelector("canvas");
        if (!canvas)
            return;
        crc2 = <CanvasRenderingContext2D>canvas.getContext("2d");
        height = canvas.height;
        width = canvas.width;

        // call functions to draw background and grass field
        drawBackground();
        drawSun();
        drawMountains();
        drawGrass();

        // call function to draw flower 20 times
        for (let i: number = 0; i < 20; i++) {
            // define flower properties
            let centerX: number = Math.random() * canvas.width + 0;
            let centerY: number = Math.random() * canvas.height + (canvas.height / 2);
            let radius: number = 40;
            let color: string = generateRandomColor();
            drawFlower(centerX, centerY, radius, 5, color);
        }
    }

    // draw background
    function drawBackground(): void {
        let gradient: CanvasGradient = crc2.createLinearGradient(0, 0, 0, crc2.canvas.height);
        gradient.addColorStop(0, "skyblue");
        gradient.addColorStop(0.6, "white");
        crc2.fillStyle = gradient;
        crc2.fillRect(0, 0, crc2.canvas.width, crc2.canvas.height);
    }

    // draw grass
    function drawGrass(): void {
        crc2.fillStyle = "cadetblue";
        crc2.fillRect(0, (crc2.canvas.height / 2), crc2.canvas.width, (crc2.canvas.height / 2));
    }

    // draw flower
    function drawFlower(centerX: number, centerY: number, radius: number, numPetals: number, color: string): void {
        
        // draw flower stem
        crc2.beginPath();
        crc2.moveTo(centerX, centerY);
        crc2.lineTo(centerX, centerY + 40);
        crc2.strokeStyle = "darkgreen";
        crc2.stroke();
        crc2.closePath();
        
        // draw flower petals
        crc2.beginPath();
        for (let i: number = 0; i < numPetals; i++) {
            let theta1: number = ((Math.PI * 2) / numPetals) * (i + 1);
            let theta2: number = ((Math.PI * 2) / numPetals) * (i);

            let x1: number = (radius * Math.sin(theta1)) + centerX;
            let y1: number = (radius * Math.cos(theta1)) + centerY;
            let x2: number = (radius * Math.sin(theta2)) + centerX;
            let y2: number = (radius * Math.cos(theta2)) + centerY;

            crc2.moveTo(centerX, centerY);
            crc2.bezierCurveTo(x1, y1, x2, y2, centerX, centerY);
        }

        crc2.closePath();
        crc2.fillStyle = color;
        crc2.fill();
        // crc2.strokeStyle = "whitesmoke";
        // crc2.lineWidth = 2;
        // crc2.stroke();

        // draw center
        crc2.beginPath();
        crc2.arc(centerX, centerY, radius / 5, 0, 2 * Math.PI, false);
        crc2.fillStyle = "#FFFF66";
        crc2.fill();
        crc2.strokeStyle = "whitesmoke";
        crc2.lineWidth = 1;
        crc2.stroke();
    }

    // generate a color with random rgb values
    function generateRandomColor(): string {
        let r: number = Math.floor(Math.random() * 255);
        let g: number = Math.floor(Math.random() * 255);
        let b: number = Math.floor(Math.random() * 255);
        let color: string = "rgba(" + r + "," + g + "," + b + "," + 1 + ")";
        return color;
    }

    // refresh page
    function refresh(): void {
        window.location.reload();
    }

    function drawMountains(): void {
        crc2.beginPath();

        let gradient: CanvasGradient = crc2.createLinearGradient(0, 0, 0, crc2.canvas.height);
        gradient.addColorStop(0, "whitesmoke");
        gradient.addColorStop(0.5, "darkslategrey");
        crc2.fillStyle = gradient;

        crc2.moveTo(500, 500);
        crc2.quadraticCurveTo(100, -100, -200, 500);
        crc2.moveTo(1500, 500);
        crc2.quadraticCurveTo(700, -200, 300, 500);
        crc2.fill();
        crc2.strokeStyle = "whitesmoke";
        crc2.lineWidth = 2;
        crc2.stroke();
        crc2.closePath();
    }

    function drawSun(): void {
        crc2.beginPath();
        crc2.arc(Math.random() * width + 100, height / 4, 100, 0, 2 * Math.PI);
        crc2.fillStyle = "#FFFF66";
        crc2.fill();
        crc2.closePath();
    }
}