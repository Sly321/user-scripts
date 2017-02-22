var Person2 = (function () {
    function Person2(fName, lName) {
        this.firstName = fName;
        this.lastName = lName;
    }
    return Person2;
}());
function hello(person) {
    console.log("Hello " + person.firstName + " " + person.lastName);
}
var sven = new Person2("Sven", "Liebig");
hello(sven);
