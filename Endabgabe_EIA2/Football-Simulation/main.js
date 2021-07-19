"use strict";
var Football;
(function (Football) {
    Football.freeze = false;
    Football.players = [];
    let btnStart;
    let formData;
    let moveables = [];
    let playersTeam1 = [];
    let playersTeam2 = [];
    let firstPage = true;
    // How many times has a player been switched out? Save to not assign the same number twice
    let timesSwitched1 = 1;
    let timesSwitched2 = 1;
    //placeholder variables for defining properties of team 1
    let color1;
    let minVelocity1;
    let maxVelocity1;
    let minPrecision1;
    let maxPrecision1;
    //placeholder variables for defining properties of team 1
    let color2;
    let minVelocity2;
    let maxVelocity2;
    let minPrecision2;
    let maxPrecision2;
    window.addEventListener("load", handleLoad);
    function handleLoad(_event) {
        // install event listener on buttons
        btnStart = document.querySelector("#btnStart");
        btnStart.addEventListener("click", handleStart);
        let headline = document.querySelector("#headline");
        headline.addEventListener("click", reload);
        let btnSwitch = document.querySelector("#btnSwitch");
        btnSwitch.addEventListener("click", changePlayer);
        window.addEventListener("keydown", checkKey);
    }
    function checkKey(_event) {
        if (_event.key == "Enter" && firstPage) {
            handleStart();
        }
    }
    function reload(_event) {
        window.location.reload();
    }
    function handleStart() {
        firstPage = false;
        // find html elements to hide and to make visible
        let flexForm = document.querySelector("#flexForm");
        let flex = document.querySelector("#flex");
        let instructions = document.querySelector("#instructions");
        let currentInfo = document.querySelector("#currentInfo");
        let selectedPlayer = document.querySelector("#selectedPlayer");
        let text = document.querySelector("#text");
        // hide elements of the first page
        flexForm.style.display = "none";
        btnStart.style.display = "none";
        instructions.style.display = "none";
        text.style.display = "none";
        // change background color and font color
        document.body.style.backgroundColor = "white";
        document.body.style.color = "black";
        // display canvas and info divs
        Football.canvas = document.querySelector("canvas");
        Football.crc2 = Football.canvas.getContext("2d");
        Football.canvas.width = 1000;
        Football.canvas.height = 500;
        flex.style.display = "flex";
        Football.canvas.style.display = "initial";
        currentInfo.style.display = "initial";
        selectedPlayer.style.display = "initial";
        // install click listener on canvas and change listener on window
        Football.canvas.addEventListener("click", getSelectedPlayer);
        Football.canvas.addEventListener("dblclick", shoot);
        //call handleForm
        handleForm();
    }
    function handleForm() {
        // save form values
        formData = new FormData(document.forms[0]);
        // team 1
        color1 = formData.get("color1")?.toString();
        minVelocity1 = Number(formData.get("minVelocity1"));
        maxVelocity1 = Number(formData.get("maxVelocity1"));
        minPrecision1 = Number(formData.get("minPrecision1"));
        maxPrecision1 = Number(formData.get("maxPrecision1"));
        //team 2
        color2 = formData.get("color2")?.toString();
        minVelocity2 = Number(formData.get("minVelocity2"));
        maxVelocity2 = Number(formData.get("maxVelocity2"));
        minPrecision2 = Number(formData.get("minPrecision2"));
        maxPrecision2 = Number(formData.get("maxPrecision2"));
        //display the chosen colors in the span elements under canvas
        let colorSpan1 = document.querySelector("#displayColor1");
        let colorSpan2 = document.querySelector("#displayColor2");
        colorSpan1.style.display = "initial";
        colorSpan2.style.display = "initial";
        colorSpan1.style.background = color1;
        colorSpan2.style.background = color2;
        //call drawField to draw the playing field
        //call setUpGame to create all instances needed for the simulation
        //call update to animate the simulation
        Football.drawField();
        setUpGame();
        update();
    }
    //create moveable objects
    function setUpGame() {
        // array with starting positions for each team
        let positions1 = [new Football.Vector(400, 250), new Football.Vector(300, 250), new Football.Vector(100, 250), new Football.Vector(600, 100), new Football.Vector(950, 50), new Football.Vector(60, 450), new Football.Vector(700, 450), new Football.Vector(450, 100), new Football.Vector(450, 400), new Football.Vector(750, 70), new Football.Vector(800, 350)];
        let positions2 = [new Football.Vector(600, 250), new Football.Vector(700, 250), new Football.Vector(900, 250), new Football.Vector(600, 400), new Football.Vector(50, 50), new Football.Vector(300, 450), new Football.Vector(200, 350), new Football.Vector(190, 140), new Football.Vector(310, 70), new Football.Vector(900, 420), new Football.Vector(820, 160)];
        // array with all player numbers
        let playerNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
        // generate 11 players for team 1
        for (let i = 0; i < 11; i++) {
            //generate individual velocity and precision values for each player in range of users choice
            let individualVelocity = generateRandomNumber(minVelocity1, maxVelocity1);
            let individualPrecision = generateRandomNumber(minPrecision1, maxPrecision1);
            // create + draw player and push them into moveables array
            let player = new Football.Player(positions1[i], individualVelocity, color1, individualPrecision, playerNumbers[i], "1");
            player.draw();
            moveables.push(player);
            Football.players.push(player);
            playersTeam1.push(player);
        }
        // generate 11 players for team 2
        for (let i = 0; i < 11; i++) {
            //generate individual velocity and precision values for each player in range of users choice
            let individualVelocity = generateRandomNumber(minVelocity2, maxVelocity2);
            let individualPrecision = generateRandomNumber(minPrecision2, maxPrecision2);
            // create + draw player and push them into moveables array
            let player = new Football.Player(positions2[i], individualVelocity, color2, individualPrecision, playerNumbers[i], "2");
            player.draw();
            moveables.push(player);
            Football.players.push(player);
            playersTeam2.push(player);
        }
        // create + draw linesman on top and push them into moveables array
        let linesmanTop = new Football.Linesman(new Football.Vector(Football.canvas.width / 1.5, Football.canvas.height / 100), 0.01);
        linesmanTop.draw();
        moveables.push(linesmanTop);
        // create + draw linesman on bottom and push them into moveables array
        let linesmanBottom = new Football.Linesman(new Football.Vector(Football.canvas.width / 1.1, Football.canvas.height / 1.01), 0.01);
        linesmanBottom.draw();
        moveables.push(linesmanBottom);
        //create + draw referee and push into moveables array
        let referee = new Football.Referee(new Football.Vector(500, 50), 0.005);
        referee.draw();
        moveables.push(referee);
        // create football and push into moveables array
        Football.football = new Football.Football(new Football.Vector(Football.canvas.width / 2, Football.canvas.height / 2), 0.015);
        Football.football.draw();
        moveables.push(Football.football);
    }
    //animate
    function update() {
        requestAnimationFrame(update);
        Football.crc2.clearRect(0, 0, Football.crc2.canvas.width, Football.crc2.canvas.height);
        Football.crc2.putImageData(Football.imageData, 0, 0);
        // if freeze is false, let all instances of moveables move
        if (!Football.freeze) {
            for (let moveable of moveables) {
                moveable.move();
                moveable.draw();
            }
            // if freeze is true, continue to draw all isntances of moveable, but only let football move
        }
        else {
            for (let moveable of moveables) {
                moveable.draw();
            }
            Football.football.move();
            Football.football.draw();
        }
        //show current info about score and which player is in possession of the ball
        getCurrentInfo();
    }
    function shoot(_event) {
        // only do the following if freeze is true and the ball is currently in possession of a player
        if (Football.freeze && ballInPossession) {
            console.log("shoot");
            Football.freeze = false;
            // find player who is in possession of the ball and make the status inPossession false again
            for (let player of Football.players) {
                if (player.inPossession) {
                    player.inPossession = false;
                    // find position where user clicked on canvas
                    let mousePosition = new Football.Vector(_event.clientX - Football.crc2.canvas.offsetLeft, _event.clientY - Football.crc2.canvas.offsetTop);
                    // get distance between ball and target
                    let direction = new Football.Vector(mousePosition.x - Football.football.position.x, mousePosition.y - Football.football.position.y);
                    // change the currentPrecision value depending on the distance between ball and target
                    if (direction.length > 500) { // if distance between ball and users chosen position is above 500 (worst case)
                        Football.currentPrecision += 20;
                        console.log("long distance shot");
                    }
                    else if (direction.length > 200) { // if distance between ball and users chosen position is above 200
                        Football.currentPrecision += 10;
                        console.log("medium distance shot");
                    }
                    else { // if distance between ball and users chosen position is under 250
                        Football.currentPrecision += 0;
                        console.log("short distance shot");
                    }
                    let newTarget = new Football.Vector(mousePosition.x - Football.currentPrecision, mousePosition.y - Football.currentPrecision);
                    // make the position the user clicked the new target of the ball
                    Football.football.target = newTarget;
                }
            }
            console.log("freeze false");
        }
    }
    // called when user switches out a player
    function changePlayer(_event) {
        //if the selected player belongs to team 1
        if (Football.selectedPlayer.team == "1") {
            Football.selectedPlayer.number = playersTeam1.length + timesSwitched1; //change number
            Football.selectedPlayer.velocity = generateRandomNumber(minVelocity1, maxVelocity1); //change velocity with new random numbers
            Football.selectedPlayer.precision = generateRandomNumber(minPrecision1, maxPrecision1); //change precision with new random numbers
            timesSwitched1++; //count up how many times a player of team 1 has been switched, so the same number won't be assigned twice to different players
        }
        else {
            Football.selectedPlayer.number = playersTeam2.length + timesSwitched2;
            Football.selectedPlayer.velocity = generateRandomNumber(minVelocity1, maxVelocity1);
            Football.selectedPlayer.precision = generateRandomNumber(minPrecision1, maxPrecision1);
            timesSwitched2++;
        }
        // call function to show the values of the selected player
        showSelectedPlayerInfo();
    }
    // 
    function getSelectedPlayer(_event) {
        //find where the player clicked on canvas, consider offsets
        let mousePosition = new Football.Vector(_event.clientX - Football.crc2.canvas.offsetLeft, _event.clientY - Football.crc2.canvas.offsetTop);
        // go through all players
        for (let player of Football.players) {
            //if the position of the click is the same as the position of a player, the player has been clicked on
            if (player.position.x - 10 < mousePosition.x && player.position.x + 10 > mousePosition.x && player.position.y - 10 < mousePosition.y && player.position.y + 10 > mousePosition.y) {
                // save which player was clicked last by user and call function to show their values
                Football.selectedPlayer = player;
                showSelectedPlayerInfo();
            }
        }
    }
    // show the values of the last player who has been selected by user
    function showSelectedPlayerInfo() {
        //find DOM elements that display info of selected player and change DOM elements innerHTML to display info of selected player
        document.querySelector("#infoTeam").innerHTML = "Team: " + Football.selectedPlayer.team;
        document.querySelector("#infoNumber").innerHTML = "Number: " + Football.selectedPlayer.number;
        document.querySelector("#infoVelocity").innerHTML = "Velocity: " + Football.selectedPlayer.velocity;
        document.querySelector("#infoPrecision").innerHTML = "Precision: " + Football.selectedPlayer.precision;
    }
    // 
    function getCurrentInfo() {
        //find DOM element to display which player is currently in possession of the ball
        let possessingPlayer = document.querySelector("#possessingPlayer");
        //go through all players
        for (let player of Football.players) {
            // if player is in possession of the ball...
            if (player.inPossession) {
                // change innerHTML to display to user which player is currently in possession
                possessingPlayer.innerHTML = "Possession: Player " + player.number + " of team " + player.team;
            }
        }
    }
    // look if the ball is currently in possession of a player or not, return boolean
    function ballInPossession() {
        let ballInPossession = false;
        for (let player of Football.players) {
            if (player.inPossession) {
                ballInPossession = true;
            }
        }
        return ballInPossession;
    }
    // generate a random number value between minimum and maximum
    function generateRandomNumber(_min, _max) {
        return Math.random() * (_max - _min) + _min;
    }
})(Football || (Football = {}));
//# sourceMappingURL=main.js.map