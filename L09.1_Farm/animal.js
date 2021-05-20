"use strict";
var L09_Farm;
(function (L09_Farm) {
    class Animal {
        constructor(_name, _breed, _sound) {
            this.name = _name;
            this.breed = _breed;
            this.sound = _sound;
        }
        sing(_amount) {
            let name = document.querySelector("#name");
            let song = document.querySelector("#song");
            let food = document.querySelector("#food");
            name.innerHTML = this.name + " the " + this.breed;
            song.innerHTML = "Old MacDonald had a farm " + (this.sound + " " + this.sound + " " + this.sound) + "<br>" + "And on his farm he had a " + this.breed + " " + (this.sound + " " + this.sound + " " + this.sound) + "<br>";
            food.innerHTML = this.name + " eats " + _amount + " lbs <br>";
        }
        eat(_stock, _itemNumber) {
            L09_Farm.stock[_itemNumber].amount -= _stock;
            L09_Farm.stockDiv = document.querySelector("#Item" + _itemNumber.toString());
            L09_Farm.stockDiv.innerHTML = L09_Farm.stock[_itemNumber].amount + " lbs of " + L09_Farm.stock[_itemNumber].name + " left";
        }
    }
    L09_Farm.Animal = Animal;
})(L09_Farm || (L09_Farm = {}));
//# sourceMappingURL=animal.js.map