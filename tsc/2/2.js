"use strict";
class User {
    name;
    age;
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    hello() {
        console.log(`Hi! My name is ${this.name}. And I am ${this.age} years old.`);
    }
}
const user = new User("Billy", 52);
user.hello();
