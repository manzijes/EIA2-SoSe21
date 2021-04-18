"use strict";
var L02_EventInspector;
(function (L02_EventInspector) {
    window.addEventListener("load", handleLoad);
    function handleLoad(_event) {
        //install mousemove + click + keyup listeners on document
        document.addEventListener("mousemove", setInfoBox);
        document.addEventListener("click", logInfo);
        document.addEventListener("keyup", logInfo);
        //find body and install click + keyup listeners
        let body = document.querySelector("body");
        body.addEventListener("click", logInfo);
        body.addEventListener("keyup", logInfo);
        //find all divs, iterate through them and install click + keyup listeners on each of them
        let div = document.querySelectorAll("div");
        for (let i = 0; i < div.length; i++) {
            div[i].addEventListener("click", logInfo);
            div[i].addEventListener("keyup", logInfo);
        }
        //catch on document
        // let event: CustomEvent = new CustomEvent("HELLO", { bubbles: true });
        // document.addEventListener("HELLO", function (): void {
        //     console.log(event.target);
        // });
        //dispatch on button
        // let btnClick: HTMLButtonElement = <HTMLButtonElement>document.querySelector("#btnClick");
        // btnClick.addEventListener("click", function (): void {
        //     btnClick.dispatchEvent(event);
        // });
    }
    function setInfoBox(_event) {
        //find span, declare variables for x + y positions of (mousemove-)event
        let span = document.querySelector("span");
        let x = _event.clientX;
        let y = _event.clientY;
        //declare string containing x + y positions of (mousemove-)event. Find event target.
        let mousePosition = "x-position: " + x + ", y-position: " + y;
        let eventTarget = _event.target;
        span.style.left = x + 20 + "px";
        span.style.top = y + 20 + "px";
        span.innerHTML = mousePosition + "<br>" + " target: " + eventTarget;
    }
    function logInfo(_event) {
        console.log("type: " + _event.type + " target: " + _event.target + " currentTarget: " + _event.currentTarget + " path: " + _event.composedPath());
    }
})(L02_EventInspector || (L02_EventInspector = {}));
//# sourceMappingURL=main.js.map