"use strict";
var L03_MemorySettings;
(function (L03_MemorySettings) {
    window.addEventListener("load", handleLoad);
    let cardContent = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
    let cardContents = [];
    let table;
    let headline;
    let selected = [];
    let foundPairs = 0;
    let time = 0;
    let btnStart;
    let form;
    // form variables for values picked by user
    let formValues = [];
    let chosenPairsNumber;
    let chosenBackground;
    let chosenFont;
    let chosenCardSize;
    let chosenCardColor;
    let chosenFontColor;
    // find HTML Elements and install click listener on start button
    function handleLoad() {
        form = document.querySelector("#form");
        btnStart = document.querySelector("#btnStart");
        headline = document.querySelector("#headline");
        table = document.querySelector("#table");
        btnStart.addEventListener("click", setUp);
    }
    // find form. Fill form variables with form values chosen by player
    function setUp(_event) {
        _event.preventDefault();
        let formData = new FormData(document.forms[0]);
        formValues = [];
        for (let entry of formData) {
            formValues.push(entry[1].toString());
        }
        // hide form and button, change headline color
        form.classList.add("hidden");
        btnStart.classList.add("hidden");
        headline.style.color = "whitesmoke";
        // get number of pairs picked by user. If number is above 25 OR below 5, use 10 as default value instead
        let pairsNumber = parseInt(formValues[0], 10);
        if (pairsNumber > 25 || pairsNumber < 5) {
            chosenPairsNumber = 10;
        }
        else {
            chosenPairsNumber = pairsNumber;
        }
        // push card contents in cardContents array until chosenPairsNumber is reached
        generateContentArray();
        generateContentArray();
        // call function to shuffle cards
        shuffleCards(cardContents);
        // save values picked by user
        chosenCardSize = formValues[1];
        chosenCardColor = formValues[4];
        chosenFontColor = formValues[3];
        chosenBackground = formValues[2];
        chosenFont = formValues[5];
        // change style according to values picked by user
        document.body.style.background = chosenBackground;
        document.body.style.fontFamily = chosenFont;
        // call function to generate cards
        generateCard();
        // call function to start timer
        timerUp();
    }
    function generateContentArray() {
        for (let z = 0; z < chosenPairsNumber; z++) {
            cardContents.push(cardContent[z]);
        }
    }
    function generateCard() {
        for (let i = 0; i < cardContents.length; i++) {
            let card = document.createElement("div");
            // determine card style
            card.style.width = chosenCardSize + "px";
            card.style.height = chosenCardSize + "px";
            card.style.background = chosenCardColor;
            card.style.color = chosenFontColor;
            // create span with content, make it a child of card
            let span = document.createElement("span");
            span.innerHTML = cardContents[i];
            card.appendChild(span);
            // put card on table
            table.appendChild(card);
            //install click listener on card
            card.addEventListener("click", turnCardAround);
            //make span containing the card content invisible to user
            span.classList.add("invisibles");
        }
    }
    // shuffle array with card contents with Fisher-Yates-Algorithm
    function shuffleCards(_cards) {
        for (let i = _cards.length - 1; i > 0; i--) {
            let a = Math.floor(Math.random() * (i + 1));
            [_cards[i], _cards[a]] = [_cards[a], _cards[i]];
        }
        return _cards;
    }
    // count up timer every second
    function timerUp() {
        setInterval(function () {
            time++;
        }, 1000);
    }
    // Gameplay
    // turn card around
    function turnCardAround(_event) {
        // add clicked card to selected-array if less than 2 cards are currently selected and they aren't the same
        let target = _event.target;
        if (selected.length < 2 && target != selected[0]) {
            selected.push(target);
            selected[0].querySelector("span")?.classList.remove("invisibles");
        }
        // in case the second card gets turned around, compare the chosen cards contents
        if (selected.length == 2) {
            selected[1].querySelector("span")?.classList.remove("invisibles");
            setTimeout(compareCards, 2000);
        }
    }
    function compareCards() {
        let card1 = selected[0].querySelector("span")?.textContent;
        let card2 = selected[1].querySelector("span")?.textContent;
        if (card1 == card2) {
            selected[0].classList.add("invisibles");
            selected[1].classList.add("invisibles");
            selected = [];
            foundPairs++;
            if (foundPairs == chosenPairsNumber) {
                setTimeout(playerWin, 1000);
            }
        }
        else {
            selected[0].querySelector("span")?.classList.add("invisibles");
            selected[1].querySelector("span")?.classList.add("invisibles");
            selected = [];
        }
    }
    function playerWin() {
        window.alert("You won! It took you " + time + " seconds to find all pairs.");
        location.reload();
    }
})(L03_MemorySettings || (L03_MemorySettings = {}));
//# sourceMappingURL=memory.js.map