namespace L09_Farm {
    export let stockDiv: HTMLElement;

    interface Item {
        name: string;
        amount: number;
    }

    export let stock: Item[] = [{
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

    function handleLoad(): void {
        runDay();
    }

    function runDay(): void {

            let unicorn: Animal = new Animal("Marge", "unicorn", "WAAAAH");
            setTimeout(function (): void {
                unicorn.eat(50, 0);
                unicorn.sing(100);
            },         1);

            let ant: Animal = new Animal("Marita", "ant", "MNEH");
            setTimeout(function (): void {
                ant.eat(60, 1);
                ant.sing(10);
            },         2000);

            let bee: Animal = new Animal("Matteo", "bee", "BSSS");
            setTimeout(function (): void {
                bee.eat(50, 2);
                bee.sing(40);
            },         7000);

            let sheep: Animal = new Animal("Melody", "sheep", "BAH");
            setTimeout(function (): void {
                sheep.eat(100, 3);
                sheep.sing(40);
            },         13000);

            let dog: Animal = new Animal("Marco", "dog", "WOOF");
            setTimeout(function (): void {
                dog.eat(200, 4);
                dog.sing(20);
            },         17000);
        }
}


