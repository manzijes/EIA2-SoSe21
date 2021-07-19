namespace Football {

    export let canvas: HTMLCanvasElement;
    export let crc2: CanvasRenderingContext2D;
    export let football: Football;
    export let freeze: boolean = false;
    export let selectedPlayer: Player; // variable to save which player was last selected by user
    export let currentPrecision: number; // value that determines the precision of a shot, changes depending on the player who kicks
    export let imageData: ImageData;
    export let players: Player[] = [];

    let btnStart: HTMLButtonElement;
    let formData: FormData;
    let moveables: Moveable[] = [];
    let playersTeam1: Player[] = [];
    let playersTeam2: Player[] = [];
    let firstPage: boolean = true;

    // How many times has a player been switched out? Save to not assign the same number twice
    let timesSwitched1: number = 1;
    let timesSwitched2: number = 1;

    //placeholder variables for defining properties of team 1
    let color1: string;
    let minVelocity1: number;
    let maxVelocity1: number;
    let minPrecision1: number;
    let maxPrecision1: number;
   
    //placeholder variables for defining properties of team 1
    let color2: string;
    let minVelocity2: number;
    let maxVelocity2: number;
    let minPrecision2: number;
    let maxPrecision2: number;

    window.addEventListener("load", handleLoad);

    function handleLoad(_event: Event): void {
    
        // install event listener on buttons
        btnStart = <HTMLButtonElement>document.querySelector("#btnStart");
        btnStart.addEventListener("click", handleStart);
        let headline: HTMLElement = <HTMLElement>document.querySelector("#headline");
        headline.addEventListener("click", reload);
        let btnSwitch: HTMLButtonElement = <HTMLButtonElement>document.querySelector("#btnSwitch");
        btnSwitch.addEventListener("click", changePlayer);
        window.addEventListener("keydown", checkKey);
    }

    function checkKey(_event: KeyboardEvent): void {
        if (_event.key == "Enter" && firstPage) {
            handleStart();
        }
    }

    function reload(_event: MouseEvent): void {
        window.location.reload();
    }

    function handleStart(): void {

        firstPage = false;

        // find html elements to hide and to make visible
        let flexForm: HTMLDivElement = <HTMLDivElement>document.querySelector("#flexForm");
        let flex: HTMLDivElement = <HTMLDivElement>document.querySelector("#flex");
        let instructions: HTMLElement = <HTMLElement>document.querySelector("#instructions");
        let currentInfo: HTMLDivElement = <HTMLDivElement>document.querySelector("#currentInfo");
        let selectedPlayer: HTMLDivElement = <HTMLDivElement>document.querySelector("#selectedPlayer");
        let text: HTMLElement = <HTMLElement>document.querySelector("#text");

        // hide elements of the first page
        flexForm.style.display = "none";
        btnStart.style.display = "none";
        instructions.style.display = "none";
        text.style.display = "none";

        // change background color and font color
        document.body.style.backgroundColor = "white";
        document.body.style.color = "black";

        // display canvas and info divs
        canvas = <HTMLCanvasElement>document.querySelector("canvas");
        crc2 = <CanvasRenderingContext2D>canvas.getContext("2d");
        canvas.width = 1000;
        canvas.height = 500;

        flex.style.display = "flex";
        canvas.style.display = "initial";
        currentInfo.style.display = "initial";
        selectedPlayer.style.display = "initial";
        
        // install click listener on canvas and change listener on window
        canvas.addEventListener("click", getSelectedPlayer);
        canvas.addEventListener("dblclick", shoot);

        //call handleForm
        handleForm();
    }

    function handleForm(): void {

        // save form values
        formData = new FormData(document.forms[0]);
        // team 1
        color1 = <string>formData.get("color1")?.toString();
        minVelocity1 = Number(formData.get("minVelocity1"));
        maxVelocity1 = Number(formData.get("maxVelocity1"));
        minPrecision1 = Number(formData.get("minPrecision1"));
        maxPrecision1 = Number(formData.get("maxPrecision1"));
        //team 2
        color2 = <string>formData.get("color2")?.toString();
        minVelocity2 = Number(formData.get("minVelocity2"));
        maxVelocity2 = Number(formData.get("maxVelocity2"));
        minPrecision2 = Number(formData.get("minPrecision2"));
        maxPrecision2 = Number(formData.get("maxPrecision2"));

        let colorSpan1: HTMLElement = <HTMLElement>document.querySelector("#displayColor1");
        let colorSpan2: HTMLElement = <HTMLElement>document.querySelector("#displayColor2");
        colorSpan1.style.display = "initial";
        colorSpan2.style.display = "initial";
        colorSpan1.style.background = color1;
        colorSpan2.style.background = color2;

        drawField();
        setUpGame();
        update();

    }

    //create moveable objects
    function setUpGame(): void {

        // array with starting positions for each team
        let positions1: Vector [] = [new Vector(400, 250), new Vector(300, 250), new Vector (100, 250), new Vector(600, 100), new Vector(950, 50), new Vector(60, 450), new Vector(700, 450), new Vector(450, 100), new Vector(450, 400), new Vector(750, 70), new Vector(800, 350)];
        let positions2: Vector [] = [new Vector(600, 250), new Vector(700, 250), new Vector(900, 250), new Vector(600, 400), new Vector(50, 50), new Vector(300, 450), new Vector(200, 350), new Vector(190, 140), new Vector(310, 70), new Vector(900, 420), new Vector(820, 160)];
        // array with all player numbers
        let playerNumbers: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

        // generate 11 players for team 1
        for (let i: number = 0; i < 11; i++) {
            //generate individual velocity and precision values for each player in range of users choice
            let individualVelocity: number = generateRandomNumber(minVelocity1, maxVelocity1);
            let individualPrecision: number = generateRandomNumber(minPrecision1, maxPrecision1);
            // create + draw player and push them into moveables array
            let player: Player = new Player(positions1[i], individualVelocity, color1, individualPrecision, playerNumbers[i], "1");
            player.draw();
            moveables.push(player);
            players.push(player);
            playersTeam1.push(player);
        }

        // generate 11 players for team 2
        for (let i: number = 0; i < 11; i++) {
            //generate individual velocity and precision values for each player in range of users choice
            let individualVelocity: number = generateRandomNumber(minVelocity2, maxVelocity2);
            let individualPrecision: number = generateRandomNumber(minPrecision2, maxPrecision2);
            // create + draw player and push them into moveables array
            let player: Player = new Player(positions2[i], individualVelocity, color2, individualPrecision, playerNumbers[i], "2");
            player.draw();
            moveables.push(player);
            players.push(player);
            playersTeam2.push(player);
        }

        // create + draw linesman on top and push them into moveables array
        let linesmanTop: Linesman = new Linesman(new Vector(canvas.width / 1.5, canvas.height / 100), 0.01);
        linesmanTop.draw();
        moveables.push(linesmanTop);

        // create + draw linesman on bottom and push them into moveables array
        let linesmanBottom: Linesman = new Linesman(new Vector(canvas.width / 1.1, canvas.height / 1.01), 0.01);
        linesmanBottom.draw();
        moveables.push(linesmanBottom);

        //create + draw referee and push into moveables array
        let referee: Referee = new Referee(new Vector(500, 50), 0.005);
        referee.draw();
        moveables.push(referee);

        // create football and push into moveables array
        football = new Football(new Vector(canvas.width / 2, canvas.height / 2), 0.01);
        football.draw();
        moveables.push(football);
    }

    //animate
    function update(): void {
        
        requestAnimationFrame(update);
        crc2.clearRect(0, 0, crc2.canvas.width, crc2.canvas.height);
        crc2.putImageData(imageData, 0, 0);

        // if freeze is false, let all instances of moveables move
        if (!freeze) {
            for (let moveable of moveables) {
                moveable.move();
                moveable.draw();
            }
        // if freeze is true, continue to draw all isntances of moveable, but only let football move
        } else {
            for (let moveable of moveables) {
                moveable.draw();
            }
            football.move();
            football.draw();
        }
        //show current info about score and which player is in possession of the ball
        getCurrentInfo();
    }

    function shoot(_event: MouseEvent): void {
        // only do the following if freeze is true and the ball is currently in possession of a player
        if (freeze && ballInPossession) {
            console.log("shoot");
            freeze = false;
            // find player who is in possession of the ball and make the status inPossession false again
            for (let player of players) {
                if (player.inPossession) {
                    player.inPossession = false;
                    // find position where user clicked on canvas
                    let mousePosition: Vector = new Vector(_event.clientX - crc2.canvas.offsetLeft, _event.clientY - crc2.canvas.offsetTop);
                    // get distance between ball and target
                    let direction: Vector = new Vector(mousePosition.x - football.position.x, mousePosition.y - football.position.y);
                    // change the currentPrecision value depending on the distance between ball and target
                    if (direction.length > 500) {             // if distance between ball and users chosen position is above 500 (worst case)
                        currentPrecision += 20;
                        console.log("long distance shot");
                    } else if (direction.length > 200) {      // if distance between ball and users chosen position is above 200
                        currentPrecision += 10;
                        console.log("medium distance shot");
                    } else {                                  // if distance between ball and users chosen position is under 250
                        currentPrecision += 0;
                        console.log("short distance shot");
                    }

                    let newTarget: Vector = new Vector (mousePosition.x - currentPrecision, mousePosition.y - currentPrecision);
                    // make the position the user clicked the new target of the ball
                    football.target = newTarget;
                }
            }
            console.log("freeze false");
        }
    }

    // called when user switches out a player
    function changePlayer(_event: MouseEvent): void {
        if (selectedPlayer.team == "1") {
            selectedPlayer.number = playersTeam1.length + timesSwitched1;
            selectedPlayer.velocity = generateRandomNumber(minVelocity1, maxVelocity1);
            selectedPlayer.precision = generateRandomNumber(minPrecision1, maxPrecision1);
            timesSwitched1++;
        } else {
            selectedPlayer.number = playersTeam2.length + timesSwitched2;
            selectedPlayer.velocity = generateRandomNumber(minVelocity1, maxVelocity1);
            selectedPlayer.precision = generateRandomNumber(minPrecision1, maxPrecision1);
            timesSwitched2++;
        }
        showSelectedPlayerInfo();
    }

    function getSelectedPlayer(_event: MouseEvent): void {
        let mousePosition: Vector = new Vector(_event.clientX - crc2.canvas.offsetLeft, _event.clientY - crc2.canvas.offsetTop);
        
        for (let player of players) {
            //if user clicked on a player
            if (player.position.x - 10 < mousePosition.x && player.position.x + 10 > mousePosition.x && player.position.y - 10 < mousePosition.y && player.position.y + 10 > mousePosition.y) {
                // save which player was clicked last by user
                selectedPlayer = player;
                showSelectedPlayerInfo();
            }
        }
    }

    function showSelectedPlayerInfo(): void {
        //find DOM elements that display info of selected player and change DOM elements innerHTML to display info of selected player
        (<HTMLElement>document.querySelector("#infoTeam")).innerHTML = "Team: " + selectedPlayer.team;
        (<HTMLElement>document.querySelector("#infoNumber")).innerHTML = "Number: " + selectedPlayer.number;
        (<HTMLElement>document.querySelector("#infoVelocity")).innerHTML = "Velocity: " + selectedPlayer.velocity;
        (<HTMLElement>document.querySelector("#infoPrecision")).innerHTML = "Precision: " + selectedPlayer.precision;
    }

    function getCurrentInfo(): void {
        let possessingPlayer: HTMLElement = <HTMLElement>document.querySelector("#possessingPlayer");
        
        for (let player of players) {
            if (player.inPossession) {
                possessingPlayer.innerHTML = "Possession: Player " + player.number + " of team " + player.team;
            }
        }
    }

    // look if the ball is currently in possession of a player or not
    function ballInPossession(): boolean {
        let ballInPossession: boolean = false;
        for (let player of players) {
            if (player.inPossession) {
                ballInPossession = true;
            }
        }
        return ballInPossession;
    }

    function generateRandomNumber(_min: number, _max: number): number {
        return Math.random() * (_max - _min) + _min;
    }
}