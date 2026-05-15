interface User_interface {
  name: string;
  age: number;
  hello(): void;
}

class User implements User_interface {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  hello(): void {
    console.log(`Hi! My name is ${this.name}. And I am ${this.age} years old.`);
  }
}


const user: User_interface = new User("Billy", 52);

user.hello();