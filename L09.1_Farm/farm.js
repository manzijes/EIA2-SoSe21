"use strict";
var L09_Farm;
(function (L09_Farm) {
    L09_Farm.stock = [{
            name: "candy",
            amount: 1000
        },
        {
            name: "mint",
            amount: 1000
        },
        {
            name: "pies",
            amount: 1000
        },
        {
            name: "fruit",
            amount: 1000
        },
        {
            name: "cookies",
            amount: 1000
        }
    ];
    window.addEventListener("load", handleLoad);
    function handleLoad() {
        runDay();
    }
    function runDay() {
        let unicorn = new L09_Farm.Animal("Marge", "unicorn", "WAAAAH");
        setTimeout(function () {
            unicorn.eat(50, 0);
            unicorn.sing(100);
        }, 1);
        let ant = new L09_Farm.Animal("Marita", "ant", "MNEH");
        setTimeout(function () {
            ant.eat(60, 1);
            ant.sing(10);
        }, 2000);
        let bee = new L09_Farm.Animal("Matteo", "bee", "BSSS");
        setTimeout(function () {
            bee.eat(50, 2);
            bee.sing(40);
        }, 7000);
        let sheep = new L09_Farm.Animal("Melody", "sheep", "BAH");
        setTimeout(function () {
            sheep.eat(100, 3);
            sheep.sing(40);
        }, 13000);
        let dog = new L09_Farm.Animal("Marco", "dog", "WOOF");
        setTimeout(function () {
            dog.eat(200, 4);
            dog.sing(20);
        }, 17000);
    }
})(L09_Farm || (L09_Farm = {}));
//# sourceMappingURL=farm.js.map