class Person2 {
    firstName: string;
    lastName: string;

    constructor(fName: string, lName: string) {
        this.firstName = fName;
        this.lastName = lName;
    }
}

/** asdf */
function hello(person) {
    console.log(`Hello ${person.firstName} ${person.lastName}`);
}

let sven = new Person2("Sven", "Liebig");

hello(sven);