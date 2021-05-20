namespace L09_Farm {
    export class Animal {
        public name: string;
        public breed: string;
        public sound: string;

        constructor(_name: string, _breed: string, _sound: string) {
            this.name = _name;
            this.breed = _breed;
            this.sound = _sound;
        }

        sing(_amount: number): void {
            let name: HTMLElement = <HTMLElement>document.querySelector("#name");
            let song: HTMLElement = <HTMLElement>document.querySelector("#song");
            let food: HTMLElement = <HTMLElement>document.querySelector("#food");
            name.innerHTML = this.name + " the " + this.breed;
            song.innerHTML = "Old MacDonald had a farm " + (this.sound + " " + this.sound + " " + this.sound) + "<br>" + "And on his farm he had a " + this.breed + " " + (this.sound + " " + this.sound + " " + this.sound) + "<br>";
            food.innerHTML = this.name + " eats " + _amount + " lbs <br>";
        }

        eat(_stock: number, _itemNumber: number): void {
            stock[_itemNumber].amount -= _stock;
            stockDiv = <HTMLElement>document.querySelector("#Item" + _itemNumber.toString());
            stockDiv.innerHTML = stock[_itemNumber].amount + " lbs of " + stock[_itemNumber].name + " left";
        }
    }
}