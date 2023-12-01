'use strict';

// What is OOP?
// - Programming paradigm/technique/structure/style based on the concept of objects
// - Objects may contain data (properties) and code/behavior (methods). By using objects we pack data and the corresponding behavior into one block
// - In OOP, objects are self-contained pieces/block of code
// - Objects are building blocks of applications, and interact with one another
// - Interactions happen through public interface (API), methods that the code outside of the object can access and use to communicate with the object
// - OOP was developed with the goal of organizing code, to make it more flexible and easier to maintain (avoid 'spaghetti code')

/* Blueprint houses */
/* Jonas explains Classes as a blueprint for a house, and when one it's done, we can create multiple houses for anybody with that same blueprint */

// OOP Fundamental Principles
// Abstractions
// Encapsulation
// Inheritance
// Polymorphism

// 1. Abstraction - to hide details that don't matter
// 2. Encapsulation - keeping properties and method private inside the class so they are not accessible from outside the class
// 3. Inheritance - one class can inherit another, if they're mostly similar; eg User and Admin classes
// - Making all properties and methods of a certain class available to a child class, forming hierarchical relationship between classes
// 4. Polymorphism - A child class can overwrite a method it inherited from a parent class [ more complex but this is the simplified concept ]

// Lecture 2 - OOP in JS
// "Classical OOP: Classes"
// Class -> Instance (instantiation)
// Objects (instances) are instantiated from a class, which functions like a blueprint
// Whereas, behavior (methods) is copied from class to all instances

// OOP in JS: Prototypes
// All objects are linked to a prototype object; aka each object has a prototype
// Prototype contains methods that can be accessed by the object -> Prototypal inheritance/delagation: The prototype contains methods (behavior) that are accessible to all objects linked to that prototype
// Behavior is delagated to the linked prototype object ^
// Prototype <- Object

// 3 Ways of Implementing Prototypal Inheritance in JS

// 1. Constructor functions
// - Technique to create ojects from a function;
// - This is how build-in objects like Arrays, Maps, or Sets are actually implemented

// 2. ES6 Classes
// - Modern alternative to constructor function syntax;
// - "Syntactic sugar": behind the scenes, ES6 classes work exactly like constructor functions;
// - ES6 classes do NOT behave like classes in 'classical OOP' (last lecture)

// 3. Object.create()
// - The easiest and most straightforward way of linking an object to a prototype object
// * not as widely used

// * The 4 pillars of OOP are still valid in Prototypal inheritance *

// Lecture 3 - Cosntructor functions and the New operator
// Constructor function -> a function that creates an object
// arrow functions dont work in constructor functions bc an arrow funtcion doesnt have a this keyword

/*
const Person = function (firstName, birthYear) {
  // console.log(this); // newly made object
  // Instance properties
  this.firstName = firstName; // this.firstName creates a new property that assigns the firstName parameter to be its value
  this.birthYear = birthYear;

  // Never do this
  // this.calcAge = function () {
  //   console.log(2037 - this.birthYear);
  // }; <- really bad practice
};

const jonas = new Person('Jonas', 1991);
console.log(jonas);

// 1. New {} is created
// 2. Function is called, this = {}
// 3. {} linked to prototype
// 4. function automatically returns {}

const matilda = new Person('Matilda', 2017);
const jack = new Person('Jack', 1975);
console.log(matilda, jack);

// const jay = 'Jay';

console.log(jonas instanceof Person); // true
// console.log(jay instanceof Person); // false

// static function
Person.hey = function () {
  console.log('Hey there :D');
  // console.log(this); // the constructor function
};
Person.hey();
// jonas.hey(); // Error bc hey method is not in the prototype of jonas object

// // Lecture 4 - Prototypes
// console.log(Person.prototype);

// // Prototypal inheritance
// Person.prototype.calcAge = function () {
//   console.log(2037 - this.birthYear);
// };

// jonas.calcAge(); // 46
// matilda.calcAge(); // 20

// console.log(jonas.__proto__);
// console.log(jonas.__proto__ === Person.prototype); // true

// console.log(Person.prototype.isPrototypeOf(jonas)); // true
// console.log(Person.prototype.isPrototypeOf(matilda)); // true

// console.log(Person.prototype.isPrototypeOf(Person)); // false
// // .prototypeOfLinkedObjects === .prototype to be less confusing

// Person.prototype.species = 'Homo Sapiens';
// console.log(jonas.species, matilda.species); // Homo Sapiens Homo Sapiens

// console.log(jonas.hasOwnProperty('firstName')); // true
// console.log(jonas.hasOwnProperty('species')); // false
// console.log(jonas.hasOwnProperty('calcAge')); // false

// // Lecture 5 - Prototypal Inheritance and the Prototype Chain
// // too much notes to put here, watch video instead
// // Prototype chaining, review it!!!

// // Lecture 6 - Prototypal inheritance on built-in objects

// console.log(jonas.__proto__.__proto__); // Object.prototype (top of prototype chain)
// console.log(jonas.__proto__.__proto__.__proto__); // null

// console.dir(Person.prototype.constructor);

// const arr = [1, 2, 3, 4, 5, 6, 5, 6, 2, 1, 9]; // same as new Array === []
// console.log(arr.__proto__);
// console.log(arr.__proto__ === Array.prototype); // true

// console.log(arr.__proto__.__proto__); // Object.prototype

// // Extend Array methods
// // Dont get into a habit of doing this
// Array.prototype.unique = function () {
//   return [...new Set(this)];
// };

// console.log(arr.unique());

// const h1 = document.querySelector('h1'); // <- deep prototype chaining
// console.dir((x) => x + 1);

// Coding Challenge #1
/*

Your tasks:
1. Use a constructor function to implement a 'Car'. A car has a 'make' and a 
'speed' property. The 'speed' property is the current speed of the car in 
km/h
2. Implement an 'accelerate' method that will increase the car's speed by 10, 
and log the new speed to the console
3. Implement a 'brake' method that will decrease the car's speed by 5, and log 
the new speed to the console
4. Create 2 'Car' objects and experiment with calling 'accelerate' and 
'brake' multiple times on each of them
Test data:

- Data car 1: 'BMW' going at 120 km/h
- Data car 2: 'Mercedes' going at 95 km/h
GOOD LUCK �

*/

// My solution
/*
const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;

  this.curSpeed = function () {
    console.log(`${this.make} going at ${this.speed} km/h`); <- redundant code bc logging is already done in the accelerate and brake method
  };
};

const bmw = new Car('BMW', 120);
const mercedes = new Car('Mercedes', 95);

bmw.curSpeed();
mercedes.curSpeed();

Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`${this.make} going at ${this.speed} km/h`);
};

bmw.accelerate();
mercedes.accelerate();

Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(`${this.make} going at ${this.speed} km/h`);
};

bmw.brake();
mercedes.brake();
*/

// Jonas solution
// const Car = function (make, speed) {
//   this.make = make;
//   this.speed = speed;
// };

// Car.prototype.accelerate = function () {
//   this.speed += 10;
//   console.log(`${this.make} going at ${this.speed} km/h`);
// };

// Car.prototype.brake = function () {
//   this.speed -= 10;
//   console.log(`${this.make} going at ${this.speed} km/h`);
// };

// const bmw = new Car('BMW', 120);
// const mercedes = new Car('Mercedes', 95);

// bmw.accelerate();
// mercedes.accelerate();

// bmw.brake();
// mercedes.brake();

// Lecture 7 - ES6 Classes

// class expression
// const PersonCL = class {}

/*
// class declaration
class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  // Methods will be added to .prototype property
  // instance methods
  calcAge() {
    console.log(2037 - this.birthYear);
  }

  greet() {
    console.log(`Hey ${this.firstName}`);
  }

  get age() {
    return 2037 - this.birthYear;
  }

  // Set a property that already exists
  set fullName(name) {
    console.log(name);
    if (name.includes(' ')) this._fullName = name;
    else alert(`${name} is not a full name!`);
  }

  get fullName() {
    return this._fullName;
  }

  // static method
  static hey() {
    console.log('Hey there :D');
    // console.log(this);
  }
}

/*
const jessica = new PersonCl('Jessica Davis', 1996);
console.log(jessica);
jessica.calcAge(); // 41

console.log(jessica.age); // 41

console.log(jessica.__proto__ === PersonCl.prototype); // true

// PersonCl.prototype.greet = function () {
//   console.log(`Hey ${this.firstName}`);
// };

jessica.greet();
// Using class hides the true nature of prototypal inheritance

const walter = new PersonCl('Walter White', 1965);

PersonCl.hey();

// notes on classes
// 1. classes are NOT hoisted <- we cannot use them like function declaration where you can access it before calling it
// 2. classes are also first class citizens
// 3. Classes are executed in strict mode

// Lecture 8 - setters and getters
const account = {
  owner: 'jonas',
  movement: [200, 630, 120, 300],

  get latest() {
    return this.movement.slice(-1).pop();
  },

  set latest(mov) {
    // set always gets 1 parameter
    this.movement.push(mov);
  },
};

console.log(account.latest); // 300

account.latest = 50;
console.log(account.movement); // [200, 630, 120, 300, 50]

console.log(jessica);

// Lecture 9 = Static methods
// Array.from is only accessible to the Array constructor
// so this [1,2,3].from won't work
*/

/*
// Object.create
const PersonProto = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },

  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const steven = Object.create(PersonProto);
console.log(steven);
steven.name = 'Steven';
steven.birthYear = 2002;
steven.calcAge(); // 35
// Least used way to implement prototypal inheritance

// Discussion on how this works in lecture video with a diagram

console.log(steven.__proto__ === PersonProto); // <- PersonProto

const sarah = Object.create(PersonProto);
sarah.init('Sarah', 1997);
sarah.calcAge();

// Coding Challenge #2
/*
Your tasks:
1. Re-create Challenge #1, but this time using an ES6 class (call it 'CarCl')
2. Add a getter called 'speedUS' which returns the current speed in mi/h (divide by 1.6)
3. Add a setter called 'speedUS' which sets the current speed in mi/h (but converts it to km/h before storing the value, by multiplying the input by 1.6)
4. Create a new car and experiment with the 'accelerate' and 'brake'
methods, and with the getter and setter.

Test data:

- Data car 1: 'Ford' going at 120 km/h

GOOD LUCK �
*/

// class CarCl {
//   constructor(make, speed) {
//     this.make = make;
//     this.speed = speed;
//   }

//   accelerate() {
//     this.speed += 10;
//     console.log(`${this.make} is going at ${this.speed} km/h`);
//   }

//   brake() {
//     this.speed -= 5;
//     console.log(`${this.make} is slowing at ${this.speed} km/h`);
//   }

//   get speedUS() {
//     return this.speed / 1.6;
//   }

//   set speedUS(speed) {
//     this.speed = speed * 1.6; // km/h converted (150)
//     //console.log(`${this.make} speed is at ${this.speed} km/h`);
//   }
// }

// // const bmw = new CarCl('BMW', 120);
// // const mercedes = new CarCl('Mercedes', 95);
// const honda = new CarCl('Honda', 10);

// bmw.accelerate();
// mercedes.accelerate();

// bmw.brake();
// mercedes.brake();

// console.log(bmw.speedUS); // get // 75 / 1.6

// bmw.speedUS = 150;
// honda.speedUS = 100;
// console.log(honda);

// honda.accelerate();

// bmw.accelerate();

// const Car = function (make, speed) {
//   this.make = make;
//   this.speed = speed;
// };

// Car.prototype.accelerate = function () {
//   this.speed += 10;
//   console.log(`${this.make} going at ${this.speed} km/h`);
// };

// Car.prototype.brake = function () {
//   this.speed -= 10;
//   console.log(`${this.make} going at ${this.speed} km/h`);
// };

// const bmw = new Car('BMW', 120);
// const mercedes = new Car('Mercedes', 95);

// bmw.accelerate();
// mercedes.accelerate();

// bmw.brake();
// mercedes.brake();

// Lecture on Inheritance between "Classes" Constructor Functions
// 1. Constructor function

// const Person = function (firstName, birthYear) {
//   this.firstName = firstName;
//   this.birthYear = birthYear;
// };

// Person.prototype.calcAge = function () {
//   console.log(2037 - this.birthYear);
// };

/*
const Student = function (firstName, birthYear, course) {
  // this.firstName = firstName;
  // this.birthYear = birthYear;
  Person.call(this, firstName, birthYear); // call method
  // console.log(this);
  this.course = course;
};

// Linking prototypes
Student.prototype = Object.create(Person.prototype); // This makes the Student inherits from Person
// Student.prototype = Person.prototype; <- wrong

Student.prototype.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const mike = new Student('Mike', 2020, 'Computer Science');
// console.log(mike);
/*
mike.introduce();
mike.calcAge();

console.log(mike.__proto__); // Student object
console.log(mike.__proto__.__proto__); // Person object

console.log(mike instanceof Student); // true
console.log(mike instanceof Person); // true, because we linked the two classes together

Student.prototype.constructor = Student;
// console.dir(Student.prototype.constructor); // Person constructor, we need to fix
*/

// Coding Challenge #3
// const Car = function (make, speed) {
//   this.make = make;
//   this.speed = speed;
// };

// Car.prototype.accelerate = function () {
//   this.speed += 10;
//   console.log(`${this.make} going at ${this.speed} km/h`);
// };

// Car.prototype.brake = function () {
//   this.speed -= 5;
//   console.log(`${this.make} going at ${this.speed} km/h`);
// };

// const EV = function (make, speed, charge) {
//   Car.call(this, make, speed);
//   this.charge = charge;
// };

// EV.prototype = Object.create(Car.prototype);

// EV.prototype.chargeBattery = function (chargeTo) {
//   this.charge = chargeTo;
// };

// // Polymorphism
// EV.prototype.accelerate = function () {
//   this.speed += 20;
//   // this.charge -= 0.01 * 100;
//   this.charge--;
//   console.log(
//     `${this.make} going at ${this.speed} km/h, with a charge of ${Math.trunc(
//       this.charge
//     )}%`
//   );
// };

// const tesla = new EV('Tesla', 120, 23);
// const bmw = new Car('BMW', 120);
// const mercedes = new Car('Mercedes', 95);

// tesla.accelerate();
// tesla.accelerate();
// tesla.accelerate();
// tesla.accelerate();
// tesla.accelerate();
// tesla.accelerate();
// bmw.accelerate();

// tesla.accelerate();

////////////////////////////////////////////////////////////////////
// Lecture - Inheritance Between "Classes": ES6 Classes
// class PersonCl {
//   constructor(fullName, birthYear) {
//     this.fullName = fullName;
//     this.birthYear = birthYear;
//   }

//   // Methods will be added to .prototype property
//   // instance methods
//   calcAge() {
//     console.log(2037 - this.birthYear);
//   }

//   greet() {
//     console.log(`Hey ${this.firstName}`);
//   }

//   get age() {
//     return 2037 - this.birthYear;
//   }

//   // Set a property that already exists
//   set fullName(name) {
//     console.log(name);
//     if (name.includes(' ')) this._fullName = name;
//     else alert(`${name} is not a full name!`);
//   }

//   get fullName() {
//     return this._fullName;
//   }

//   // static method
//   static hey() {
//     console.log('Hey there :D');
//     // console.log(this);
//   }
// }

// class StudentCl extends PersonCl {
//   constructor(fullName, birthYear, course) {
//     // Always needs to happen first
//     super(fullName, birthYear); // this is like the call method but better, review it lmao
//     this.course = course;
//   }

//   introduce() {
//     console.log(`My name is ${this.fullName} and I study ${this.course}`);
//   }

//   calcAge() {
//     console.log(
//       `I'm ${2037 - this.birthYear} years old, but as a student I feel more ${
//         2037 - this.birthYear + 10
//       } years old`
//     ); // this overrides the method in the prototype chain because this appears first in the chain
//   }
// }

// // const martha = new StudentCl('Martha Jones', 2012);
// const martha = new StudentCl('Martha Jones', 2012, 'Computer Science');
// martha.introduce();
// martha.calcAge();

// Lecture - Inheritance Between Classes: Object.create
// const PersonProto = {
//   calcAge() {
//     console.log(2037 - this.birthYear);
//   },

//   init(firstName, birthYear) {
//     this.firstName = firstName;
//     this.birthYear = birthYear;
//   },
// };

// const steven = Object.create(PersonProto);

// const StudentProto = Object.create(PersonProto);
// StudentProto.init = function (firstName, birthYear, course) {
//   PersonProto.init.call(this, firstName, birthYear);
//   this.course = course;
// };

// StudentProto.introduce = function () {
//   console.log(`My name is ${this.fullName} and I study ${this.course}`);
// };

// const jay = Object.create(StudentProto); // <- the student object is not the prototype of jay
// jay.init('Jay', 2010, 'Computer Science');
// jay.introduce();
// jay.calcAge();
// This pattern is more easy to understand because we dont have to worry about constructor functions anymore, because this method only is stacking objects upon objects of each other
/* In the real world, especially in JS, you will mostly see ES6 classes being used now */

// Lecture Another Class Example
class Account {
  // 1. Public fields (instances)
  locale = navigator.language;
  // _movements = [];

  // 2. Private fields (instances)
  #movements = [];
  #pin;

  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    this.#pin = pin;
    // protected property
    // this._movements = []; <- same as public fields
    // this.locale = navigator.language;

    //console.log(`Thanks for opening an account, ${owner}`);
  }

  // 3. Public methods

  // Public interface <- can also be called API
  getMovements() {
    return this.#movements;
  }

  deposit(val) {
    this.#movements.push(val);
    return this; // returns an instance of an account object to avoid undefined in chaining
  }

  withdraw(val) {
    this.deposit(-val);
    return this;
  }

  requestLoan(val) {
    if (this._approveLoan(val)) {
      this.deposit(val);
      console.log('Loan approved');
      return this;
    }
  }

  static helper() {
    console.log('Helper');
  }

  // 4. Private methods
  // #approveLoan(val) {
  _approveLoan(val) {
    return true;
  }
}

const acc1 = new Account('Jonas', 'EUR', 1111);

// acc1._movements.push(250); // still accessible but its secret
// acc1._movements.push(-150);
// acc1.deposit(250);
// acc1.withdraw(50);
// acc1.requestLoan(1000);
// // acc1.approveLoan(1000); // <- this should not be accessible publicly
// console.log(acc1.getMovements()); // can access the property movements but you cannot override it

// console.log(acc1);
// console.log(acc1.pin); // undefined bc pin property is hidden

// Account.helper(); // Helper

// console.log(acc1.#approveLoan(100)); // error

// console.log(acc1.#movements); // error
// console.log(acc1.#pin); // error

// Lecture - Encapsulation: Protected Properties and Methods
// Data privacy principles -> the underscore (_) convention

// Lecture - Encapsulation: Private Class Fields and Methods
// 1. Public fields
// 2. Private fields
// 3. Public methods
// 4. Private methods
// (there is also the static version)

// Lecture - Chaining Methods
// acc1.deposit(300).deposit(100).withdraw(35).requestLoan(25000).withdraw(4000);
// console.log(acc1.getMovements());

// Coding Challenge #4
/*

Your tasks:
1. Re-create Challenge #3, but this time using ES6 classes: create an 'EVCl'
child class of the 'CarCl' class
2. Make the 'charge' property private
3. Implement the ability to chain the 'accelerate' and 'chargeBattery'
methods of this class, and also update the 'brake' method in the 'CarCl'
class. Then experiment with chaining!

Test data:
§ Data car 1: 'Rivian' going at 120 km/h, with a charge of 23%

GOOD LUCK �

*/

class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accelerate() {
    this.speed += 10;
    console.log(`${this.make} is going at ${this.speed} km/h`);
    return this;
  }

  brake() {
    this.speed -= 5;
    console.log(`${this.make} is slowing at ${this.speed} km/h`);
    return this;
  }

  get speedUS() {
    return this.speed / 1.6;
  }

  set speedUS(speed) {
    this.speed = speed * 1.6;
  }
}

class EVCl extends CarCl {
  #charge;

  constructor(make, speed, charge) {
    super(make, speed);
    this.#charge = charge;
  }

  chargeBattery(chargeTo) {
    this.#charge = chargeTo;
    return this;
  }

  accelerate() {
    this.speed += 20;
    this.#charge--;
    console.log(
      `${this.make} going at ${this.speed} km/h, with a charge of ${Math.trunc(
        this.#charge
      )}%`
    );
    return this;
  }
}

const rivian = new EVCl('Rivian', 120, 23);
// console.log(rivian.#charge); // cannot access outside of class
rivian
  .accelerate()
  .accelerate()
  .accelerate()
  .brake()
  .chargeBattery(50)
  .accelerate();

console.log(rivian.speedUS);

/*
const EV = function (make, speed, charge) {
  CarCl.call(this, make, speed);
  this.charge = charge;
};

EV.prototype = Object.create(CarCl.prototype);

EV.prototype.chargeBattery = function (chargeTo) {
  this.charge = chargeTo;
};

// Polymorphism
EV.prototype.accelerate = function () {
  this.speed += 20;
  // this.charge -= 0.01 * 100;
  this.charge--;
  console.log(
    `${this.make} going at ${this.speed} km/h, with a charge of ${Math.trunc(
      this.charge
    )}%`
  );
};
*/

// Note from me: you need to rewatch this whole section lmao
