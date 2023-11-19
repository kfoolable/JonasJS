'use strict';

// // Scoping
// const a = 'Jonas';

// function first() {
//   const b = 'Hello!';
//   second();

//   function second() {
//     const c = 'Hi';
//     third();
//   }
// }

// function third() {
//   const d = 'Hey';
//   console.log(d + c + b + a);
//   // ReferenceError
// }

// function calcAge(birthYear) {
//   const age = 2037 - birthYear;

//   function printAge() {
//     let output = `${firstName} is ${age}, born in ${birthYear}.`;
//     console.log(output);

//     if (birthYear >= 1981 && birthYear <= 1996) {
//       var millenial = true;
//       const firstName = 'Steven';
//       const str = `Oh, and you're old af you millenial dinosaur, ${firstName}`;
//       console.log(str);

//       function add(a, b) {
//         return a + b;
//       }
//       add(2, 3);

//       output = 'NEW OUTPUT';
//     }
//     console.log(millenial);
//     //console.log(add(2, 3));
//     console.log(output);
//   }
//   printAge();

//   return age;
// }

// const firstName = 'Gillian';
// calcAge(1991);

// HOISTING
// variables
//console.log(me);
// console.log(job); // ReferenceError
// console.log(year); // ReferenceError

// var me = 'Gillian';
// let job = 'teacher';
// const year = 1998;

// // Functions
// console.log(addDecl(2, 3));
// // console.log(addExpr(4, 5));
// // console.log(addArrow(2, 4));

// function addDecl(a, b) {
//   return a + b;
// }

// const addExpr = function (a, b) {
//   return a + b;
// };

// var addArrow = (a, b) => a + b;

// // Example

// if (!numProducts) deleteShoppingCart();

// var numProducts = 10;

// function deleteShoppingCart() {
//   console.log('All products deleted!');
// }

// var x = 1;
// let y = 2;
// const z = 3;

// console.log(x === window.x);

// this keyword / this variable

// console.log(this);

// const calcAge = function (birthYear) {
//   console.log(2037 - birthYear);
//   console.log(this);
// };

// calcAge(1991);

// // arrow function doesnt have its own this keyword
// const calcAgeArrow = (birthYear) => {
//   console.log(2037 - birthYear);
//   console.log(this);
// };

// calcAgeArrow(1991);

// const jonas = {
//   year: 1991,
//   calcAge: function () {
//     console.log(this);
//     console.log(2037 - this.year);
//   },
// };
// //jonas.calcAge();

// const gillian = {
//   year: 1998,
// };

// gillian.calcAge = jonas.calcAge;
// gillian.calcAge();

// const f = jonas.calcAge;
// f();

// var firstName = 'Matilda';

// An arrow function does NOT get its own this keyword
// const jonas = {
//   firstName: 'Jonas',
//   year: 1991,
//   calcAge: function () {
//     console.log(this);
//     console.log(2037 - this.year);

//     // Solution 1
//     //     const self = this;
//     //     const isMillenial = function () {
//     //       console.log(self);
//     //       console.log(self.year >= 1981 && self.year <= 1996);
//     //     };
//     //     isMillenial();
//     //   },

//     // Solution 2
//     const isMillenial = () => {
//       console.log(this);
//       console.log(this.year >= 1981 && this.year <= 1996);
//     };
//     isMillenial();
//   },

//   // Arrow function
//   // Never use an arrow function as a method
//   //   greet: () => {
//   //     console.log(this);
//   //     console.log(`Hey ${this.firstName}!`);
//   //   },
//   greet: function () {
//     console.log(this);
//     console.log(`Hey ${this.firstName}!`);
//   },
// };
// jonas.greet();
// jonas.calcAge();

// // arguments keyword

// const addExpr = function (a, b) {
//   console.log(arguments);
//   return a + b;
// };

// addExpr(2, 5);
// addExpr(5, 1, 8, 12);

// // 'arguments' doesnt exist in an arrow function
// var addArrow = (a, b) => {
//   console.log(arguments);
//   return a + b;
// };
// addArrow(2, 5, 8);

// Primitives vs objects (primitive vs reference types)

let age = 30;
let oldAge = age; // 30
age = 31;
console.log(age);
console.log(oldAge);

const me = {
  name: 'Gil',
  age: 30,
};

//Objects.assign creates a new object copying the me object
const friend = Object.assign({}, me);
friend.age = 27;
console.log('Friend: ', friend);
console.log('Me: ', me);
