namespace L11_Advanced {

    // install load listener on window, declare global variables
    window.addEventListener("load", handleLoad);
    export let crc2: CanvasRenderingContext2D;
    let reloadBtn: HTMLButtonElement;
    let height: number = 0;
    let width: number = 0;
    let flowers: Flower[] = [];
    let moveables: Moveable[] = [];
    let imgData: ImageData;

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

        // create flower 20 times
        for (let i: number = 0; i < 20; i++) {
            // define flower properties
            let centerX: number = Math.random() * canvas.width + 0;
            let centerY: number = Math.random() * canvas.height + (canvas.height / 2);
            let radius: number = 40;
            let color: string = generateRandomColor();
            let flower: Flower = new Flower(centerX, centerY, radius, 5, color, (Math.random() - 0.009) * 0.02);
            flowers.push(flower);
        }
        drawFlowers();
        imgData = crc2.getImageData(0, 0, canvas.width, canvas.height);

        // create bee 5 times
        for (let i: number = 0; i < 5; i++) {
            let randomSpeedX: number = (Math.random() - 1) * 4;
            let randomSpeedY: number = (Math.random() - 0.6) * 4;
            let randomScale: number = 0.5 + Math.random() * (1.2 - 1);
            let bee: Bee = new Bee(canvas.width * 0.5, canvas.height * 0.5, randomSpeedX, randomSpeedY, randomScale);
            moveables.push(bee);
        }
        drawMoveables();
        update();
    }

    // call draw method on all flowers
    function drawFlowers(): void {
        for (let i: number = 0; i < flowers.length; i++) {
            flowers[i].draw();
        }
    }

    // call draw method on all moveables
    function drawMoveables(): void {
        for (let i: number = 0; i < moveables.length; i++) {
            moveables[i].draw();
        }
    }

    // animate
    function update(): void {
        requestAnimationFrame(update);
        crc2.clearRect(0, 0, crc2.canvas.width, crc2.canvas.height);
        crc2.putImageData(imgData, 0, 0);

        for (let i: number = 0; i < flowers.length; i++) {
            flowers[i].fillNectar();
        }
        
        for (let i: number = 0; i < moveables.length; i++) {
            moveables[i].update();
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

    // generate a color with random rgb values
    function generateRandomColor(): string {
        let r: number = Math.floor(Math.random() * 255);
        let g: number = Math.floor(Math.random() * 255);
        let b: number = Math.floor(Math.random() * 255);
        let color: string = "rgba(" + r + "," + g + "," + b + "," + 1 + ")";
        return color;
    }

    // refresh page (called by click on refresh button)
    function refresh(): void {
        window.location.reload();
    }

    // draw part of background, mountains
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

    // draw sun in random location in the sky
    function drawSun(): void {
        crc2.beginPath();
        crc2.arc(Math.random() * width + 100, height / 4, 100, 0, 2 * Math.PI);
        crc2.fillStyle = "#FFFF66";
        crc2.fill();
        crc2.closePath();
    }
}