'use strict';

/*
// Default Parameters - Lesson 1
const bookings = [];

// ES6 - New way of default value
const createBooking = function (
  flightNumber,
  numPassengers = 1,
  price = 199 * numPassengers
) {
  // Old way default value - ES5
  //   numPassengers = numPassengers || 1;
  //   price = price || 199;
  const booking = {
    flightNumber,
    numPassengers,
    price,
  };

  console.log(booking); // Logs the booking object with 'LH123' as value for flightNumber key/property
  bookings.push(booking); // Pushes the props and values of booking to empty array
};

createBooking('LH123');
createBooking('LH123', 2, 800); // 2 and 800 overrides params because you already set them in the argument
createBooking('LH123', 2); // dynamically calculated price propery bc of calculation in default value set
createBooking('LH123', 5);

createBooking('LH123', 1000); // cannot skip an argument
createBooking('LH123', undefined, 1000); // correct way if you want to skip
*/

// Lesson 2 - How passing arguments works: values vs. reference
/*
const flight = 'LH234';

const jonas = {
  name: 'Jonas Schmedtmann',
  passport: 345346567454,
};

const checkIn = function (flightNum, passenger) {
  // Not to do
  // Is the same as doing...
  flightNum = 'LH9999'; // this doesnt work bc flightNum doesn't get the value of the parameter
  passenger.name = 'Mr. ' + passenger.name;

  if (passenger.passport === 345346567454) {
    alert('Checked in');
  } else {
    alert('Wrong passport!');
  }
};

// checkIn(flight, jonas);
// console.log(flight); // LH234 not LH999
// console.log(jonas);

// Is the same as doing...
// Not good
// const flightNum = flight;
// const passenger = jonas;

const newPassport = function (person) {
  person.passport = Math.trunc(Math.random() * 100000000);
};
newPassport(jonas);
checkIn(flight, jonas);
*/

/*
// Lesson 3 - First-Class vs. Higher-Order functions
// ----------- Notes -------------//
// First Class
// - JS treats function as first-class citizens
// - This means thaat functions are simply values
// - Functions are just another type of object

// -- More ideas on the video on section 10

// Lesson 4 - Higher-Order functions
// Functions accepting callback functions

// "Low level functions / oneWord and upperFirstWord"
// const oneWord = function (str) {
//   return str.replace(/ /g, '').toLowerCase();
// };

// const upperFirstWord = function (str) {
//   const [first, ...others] = str.split(' ');
//   return [first.toUpperCase(), ...others].join(' ');
// };

// // Higher-Order function
// const transformer = function (str, fn) {
//   console.log(`Original string: ${str}`);
//   console.log(`Transformed string:  ${fn(str)}`);

//   console.log(`Transformed by: ${ fn.name }`);
// };

// // callback functions
// transformer('JavaScript is the best!', upperFirstWord);
// transformer('JavaScript is the best!', oneWord);

// // JS uses callbacks all the time!
// const high5 = function () {
//   console.log('Hi 5!');
// };
// document.body.addEventListener('click', high5);

// ['jonas', 'martha', 'adam'].forEach(high5); // 3 high 5s

// Callback methods allows to create Abstractions
// Abstraction - we hide the details of some code implementation because we dont really gaf about all that detail, this allows  us to look at problems in a more higher or abstract level
// That's why its called an abstraction

// Trying out to create higher order function

// const calculateGrade = function (first) {
//   return first;
// };

// const calculatedRank = function (avg) {
//   let result = calculateGrade(avg);
//   return result >= 89.99 ? 'Yes! Good job!' : 'No, sorry!';
// };

// // Higher order function
// const calculated = function (grade, fn) {
//   console.log(`Your grades: ${grade}`);
//   console.log(`Your original grade: ${fn(grade)}`);
//   console.log(`Are you cum laude?: ${fn(grade)}`);
// };

// calculated(89, calculateGrade);
// //calculated(89, calculatedRank);
*/

/*
// Lesson 5 - Functions returning functions

const greet = function (greeting) {
  return function (name) {
    console.log(`${greeting} ${name}`);
  };
};

const greeterHey = greet('Hey');
greeterHey('Jonas');
greeterHey('Steven');

greet('Hello')('Gillian');

// Challenge
const greetArrow = (greeting) => (name) => console.log(`${greeting} ${name}`);

greetArrow('Sup')('Yelena');
*/

/*
// Lesson 6 - the call and apply methods
const lufthansa = {
  airline: 'Lufthansa',
  iataCode: 'LH',
  bookings: [],
  book(flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
    );
    this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
  },
};

lufthansa.book(239, 'Jonas Schmedtmann');
lufthansa.book(635, 'John Smith');
console.log(lufthansa);

// after some years, lufthansa created a new airline

const eurowings = {
  airline: 'Eurowings',
  iataCode: 'EW',
  bookings: [],
};

const book = lufthansa.book;

// book(23, 'Sarah Williams'); // typeError because the this keyword in copied method (book) from lufthansa is only pointing to the lufthansa object, not the eurowings object itself

// Call Method
book.call(eurowings, 23, 'Sarah Williams');
console.log(eurowings);

book.call(lufthansa, 239, 'Mary Cooper');
console.log(lufthansa);

const swiss = {
  airline: 'Swiss Air Lines',
  iataCode: 'SA',
  bookings: [],
};

book.call(swiss, 986, 'Gillian Gavino');

console.log(swiss);

// Apply Method - takes an array of arguments
const flightData = [583, 'George Cooper'];
book.apply(swiss, flightData);
console.log(swiss);

// Better and more common way
book.call(swiss, ...flightData);

// Bind method
// book.call(eurowings, 23, 'Sarah Williams');

const bookEW = book.bind(eurowings); // the bind method does not call the book method, it creates a new function that only points to the first object you set it to, in this example, in eurowings
bookEW(239, 'Steven Williams'); // new function
console.log(eurowings);

const bookLH = book.bind(lufthansa);
bookLH(345, 'Robert Green');

// For flight EW23 only
// Partial application
const bookEW23 = book.bind(eurowings, 23);
bookEW23('Clarissa Smith');
bookEW23('Martha Cooper');

// With Event Listeners
lufthansa.planes = 300;
lufthansa.buyPlane = function () {
  console.log(this);

  this.planes++;
  console.log(this.planes);
};
lufthansa.buyPlane();

const buyPl = lufthansa.buyPlane;

document.querySelector('.buy').addEventListener('click', buyPl.bind(lufthansa));

// Partial application
const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));

// this sets the rate value to be .23
const addVAT = addTax.bind(null, 0.23);
// addVAT = value => value + value * 0.23
console.log(addVAT(200));
console.log(addVAT(250));

// Challenge
const addTax1 = (rate) => (value) => value + value * rate;

const addVAT1 = addTax1(0.23);

console.log('---- Function returning function ---- ');
// console.log(addTax1(0.23)(250));
console.log(addVAT1(250));
*/

/*
// Lesson 7 - Immediately invoked function expressions (IIFE)
// Functions that are only executed once, and it desappears when its called once

const runOnce = function () {
  console.log('This will never run again');
};
runOnce();

// IIFE
(function () {
  console.log('This will never run again');
  const isPrivate = 29; // encapsulated inside of this function scope
})(); // () calls it immediately

// console.log(isPrivate); // Error

(() => console.log('This will also never run again'))();
*/

/*
// Lesson 8 - Closures
// Analyzing call stack
const secureBooking = function () {
  let passengerCount = 0;

  return function () {
    passengerCount++;
    console.log(`${passengerCount} passengers`);
  };
};

const booker = secureBooking();

booker();
booker();
booker();

// A function has access to the variable environment (VE) of the execution context in which it was created
// Closure - VE attached to the function, exactly as it was at the time and place the function was created
// Closure - is like a backpack that a function carries around wherever it goes. This backpack has all the variables that were present in the environment where the function was created
// !! We do not have to create closues manually !! JS does it automatically

console.dir(booker);
*/

// Lesson 9 - More Closure Examples

let f;

const g = function () {
  const a = 23;

  f = function () {
    console.log(a * 2);
  };
};

const h = function () {
  const b = 777;
  f = function () {
    console.log(b * 2);
  };
};

g();
f();
console.dir(f);

// Re-assigning f function
h();
f();
console.dir(f);

// Example 2
const boardPassengers = function (n, wait) {
  const perGroup = n / 3;

  // timer function
  setTimeout(function () {
    console.log(`We are now boarding all ${n} passengers`);
    console.log(`There are 3 groups, each with ${perGroup} passengers`);
  }, wait * 1000);

  console.log(`Will start boarding in ${wait} seconds`);
};

const perGroup = 1000; // the variable inside of the function is prioritized, not this
boardPassengers(180, 3);
