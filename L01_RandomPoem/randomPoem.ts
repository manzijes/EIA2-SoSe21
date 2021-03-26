namespace L01_RandomPoem {
    
    window.addEventListener("load", handleLoad);
    //declare string arrays with fitting variables
    let subjects: string[] = ["Diluc", "Kaeya", "Bennett", "Albedo", "Klee", "Childe", "Xiao", "Jean", "Mona", "Barbara", "Noelle", "Sucrose", "Amber", "Lisa", "Razor"];
    let predicates: string[] = ["fights", "shoos away", "invites", "attacks", "scares", "defeats", "underestimates", "meets", "scolds", "imitates", "lies to", "reads a poem to", "sings to"];
    let objects: string[] = ["Hilichurls", "the Fatui", "Gouba", "Oz", "Paimon", "Dvalin", "the Wolf of the North", "a hoard of wild boars", "the Knights of Favonius", "a Seelie", "the Traveler"];

    function handleLoad(_event: Event): void {
        //find shortest array and return length as number. Save as shortestLength (so that string arrays won't have to be the same length)
        let shortestLength: number = findShortestArray(subjects, predicates, objects);
        
        //backward for loop that calls function getVerse and shows returned value in console. Uses shortestLength as index number
        for (let index: number = shortestLength; index > 0; index--) {
            let returnValue: string = getVerse(subjects, predicates, objects);
            console.log(returnValue);
        }
    }

    // function compares array lengths and returns length of shortest array
    function findShortestArray(_subjects: string[], _predicates: string[], _objects: string[]): number {
        let shortestLength: number = _subjects.length;
        if (_predicates.length < shortestLength)
            shortestLength = _predicates.length;
        if (_objects.length < shortestLength)
            shortestLength = _objects.length;        
        return shortestLength;
    }

    //function picks random value from each array, saves them in a string and returns string
    function getVerse(_subjects: string[], _predicates: string[], _objects: string[]): string {
        let verse: string = "";
        
        //generate random round number in the range of each arrays length
        let randomNumberSubject: number = Math.floor(Math.random() * _subjects.length);
        let randomNumberPredicate: number = Math.floor(Math.random() * _predicates.length);
        let randomNumberObject: number = Math.floor(Math.random() * _objects.length);
        
        //pick value from each array at place of random number
        let randomSubject: string[] = _subjects.splice(randomNumberSubject, 1);
        let randomPredicate: string[] = _predicates.splice(randomNumberPredicate, 1);
        let randomObject: string[] = _objects.splice(randomNumberObject, 1);

        //generate string with randomly picked values of each array
        verse = randomSubject[0] + " " + randomPredicate[0] + " " + randomObject[0];
        return verse;
    }

}