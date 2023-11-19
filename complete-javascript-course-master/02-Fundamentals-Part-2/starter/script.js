"use strict";

// let hasDriversLicense = false;
// const passTest = true;

// if (passTest) hasDriversLicense = true;
// if (hasDriversLicense) console.log("I can drive :D");

// function logger() {
//   console.log("My name is Gil");
// }

// //invoking, calling, running function
// logger();
// logger();
// logger();

// function fruitProcessor(apples, oranges) {
//   //console.log(apples, oranges);
//   const juice = `Juice with ${apples} apples and ${oranges} oranges. `;
//   return juice;
// }

// const appleJuice = fruitProcessor(5, 0);
// console.log(appleJuice);

// const appleOrangeJuice = fruitProcessor(2, 4);
// console.log(appleOrangeJuice);

// const age1 = calcAge1(1998); // as shown here

// //function declaration
// //you can call a function declaration before its been defined != not the same with function expression
// function calcAge1(birthYear) {
//   return 2037 - birthYear;
// }

// console.log(age1);

// //function expression -> anonymous function
// const calcAge2 = function (birthYear) {
//   return 2037 - birthYear;
// };

// const age2 = calcAge2(1991);
// console.log(age2);

// arrow function

/*const calcAge3 = (birthYear) => 2037 - birthYear;
const age3 = calcAge3(1998);

console.log(age3);

const yearsUntilRetirement = (birthYear, firstName) => {
  const age = 2023 - birthYear;
  const retirement = 65 - age;
  //return retirement;
  return `${firstName} retires in ${retirement} years.`;
};

console.log(yearsUntilRetirement(1998, "Gillian"));
console.log(yearsUntilRetirement(1991, "Jonas"));*/

// function fruitCutter(fruit) {
//   return fruit * 4;
// }

// function fruitProcessor(apples, oranges) {
//   const applePieces = fruitCutter(apples);
//   const orangesPieces = fruitCutter(oranges);

//   //console.log(apples, oranges);
//   const juice = `Juice with ${applePieces} pieces of apples and ${orangesPieces} pieces of oranges. `;
//   return juice;
// }

// console.log(fruitProcessor(2, 3));

// const yearsUntilRetirement = function (birthYear, firstName) {
//   const age = 2023 - birthYear;
//   const retirement = 65 - age;
//   //return retirement;
//   return `${firstName} retires in ${retirement} years.`;
// };

// Arrays

// const myFriends = ["Michael", "Steven", "Peter", "Jonas"];

// const year = new Array(1991, 1992, 1998, 2000);

// console.log(myFriends[0]);

// console.log(myFriends[myFriends.length - 1]); // .length is a property

// const calcAge = function (birthYear) {
//   return 2037 - birthYear;
// };

// const years = [1990, 2009, 1991, 2000];

// const age1 = calcAge(years[0]);
// const age2 = calcAge(years[1]);
// const age3 = calcAge(years[2]);
// const age4 = calcAge(years[years.length - 1]);

// console.log(age1, age2, age3, age4);

// const ages = [calcAge(years[0]), calcAge(years[1])];
// console.log(ages);

// DATA STRUCTURES

// Array methods
// const myFriends = ["Michael", "Steven", "Peter", "Jonas"];

// // .push adds an element to the end of the array
// const newLength = myFriends.push("Jay");

// console.log(myFriends);
// console.log(newLength);

// // .unshift adds an element to the start of the array
// myFriends.unshift("John");
// console.log(myFriends);

// Remove elements

// removes the last element of an array
// myFriends.pop();
// const popped = myFriends.pop();

// console.log(myFriends);
// console.log(popped);

// //removes the first element
// myFriends.shift();
// console.log(myFriends);

// console.log(myFriends.indexOf("Steven"));
// console.log(myFriends.indexOf("Bob"));

// console.log(myFriends.includes("Steven"));
// console.log(myFriends.includes("Bob"));

// if (myFriends.includes("Sissy")) {
//   console.log("You have a friend called Peter");
// } else {
//   console.log("Sorry, you dont have this friend");
// }

// Objects

// const jonasArray = [
//   "Jonas",
//   "Schmedtmann",
//   2037 - 1991,
//   "teacher",
//   ["Michael", "Peter", "Steven"],
// ];

// // key-value pairs
// // each key is also called a property
// // objects are the most fundamental concept in whole JS language

// const jonas = {
//   firstName: "Jonas",
//   lastName: "Schmedtmann",
//   age: 2037 - 1991,
//   job: "teacher",
//   friends: ["Michael", "Peter", "Steven"],
// };

// // dot notation
// console.log(jonas.lastName);
// console.log(jonas["lastName"]);

// // brackets notation
// const nameKey = "Name";
// console.log(jonas["first" + nameKey]);
// console.log(jonas["last" + nameKey]);

// const interestedIn = prompt(
//   "What do you want know about Jonas? Choose between firstName, lastName, age, job and friends"
// );

// if (jonas[interestedIn]) {
//   console.log(jonas[interestedIn]);
// } else {
//   console.log("Wrong request");
// }

// jonas.location = "Portugal";
// jonas["twitter"] = "@jonasschmedtmann";

// console.log(jonas);

// console.log(
//   `${jonas.firstName} has ${jonas.friends.length} friends, and his best friend is called ${jonas.friends[0]}`
// );

// Object methods

// const jonas = {
//   firstName: "Jonas",
//   lastName: "Schmedtmann",
//   birthYear: 1991,
//   job: "teacher",
//   friends: ["Michael", "Peter", "Steven"],
//   hasDriversLicense: true,

//   // calcAge: function (birthYear) {
//   //   return 2037 - birthYear;
//   // },

//   calcAge: function () {
//     //console.log(this);
//     this.age = 2037 - this.birthYear;
//     return this.age;
//   },

//   jonasSummary: function () {
//     let jonasDriversL;
//     if (this.hasDriversLicense === true) {
//       jonasDriversL = "has a driver's license";
//     } else {
//       jonasDriversL = "has no driver's license";
//     }

//     let summary = `${this.firstName} is a  ${this.calcAge()}-year old ${
//       this.job
//     }, and he ${jonasDriversL}.`;
//     return summary;
//   },
// };

// console.log(jonas.calcAge());

// console.log(jonas.age);
// console.log(jonas.age);
// console.log(jonas.age);
// //console.log(jonas.calcAge());
// //console.log(jonas["calcAge"](1991));

// console.log(jonas.jonasSummary());

// LOOPS

// for (let rep = 1; rep <= 10; rep++) {
//   console.log(`Lifting weights rep ${rep}`);
// }

// const jonasArray = [
//   "Jonas",
//   "Schmedtmann",
//   2037 - 1991,
//   "teacher",
//   ["Michael", "Peter", "Steven"],
//   true,
// ];

// const types = [];

// for (let i = 0; i < jonasArray.length; i++) {
//   // reading from jonas array
//   console.log(jonasArray[i], typeof jonasArray[i]);

//   // filling types array
//   //types[i] = typeof jonasArray[i];
//   types.push(typeof jonasArray[i]);
// }

// console.log(types);

// const years = [1991, 1992, 2000, 1998];
// const ages = [];

// for (let i = 0; i < years.length; i++) {
//   ages.push(2037 - years[i]);
// }
// console.log(ages);

// console.log(" ---- ONLY STRINGS ----");
// for (let i = 0; i < jonasArray.length; i++) {
//   if (typeof jonasArray[i] !== "string") continue;

//   console.log(jonasArray[i], typeof jonasArray[i]);
// }

// console.log(" ---- BREAK WITH NUMBER ----");
// for (let i = 0; i < jonasArray.length; i++) {
//   if (typeof jonasArray[i] === "number") break;

//   console.log(jonasArray[i], typeof jonasArray[i]);
// }

// looping backwards

const jonasArray = [
  "Jonas",
  "Schmedtmann",
  2037 - 1991,
  "teacher",
  ["Michael", "Peter", "Steven"],
  true,
];

// 0, 1, 2, ... 4
// 4 ... 0

// for (let i = jonasArray.length - 1; i >= 0; i--) {
//   console.log(i, jonasArray[i], typeof jonasArray[i]);
// }

// for (let exercise = 1; exercise <= 3; exercise++) {
//   console.log(` ---- Starting exerciise ${exercise}`);

//   for (let rep = 1; rep <= 5; rep++) {
//     console.log(`Lifting weights repetition ${rep}`);
//   }
// }

let rep = 1;
while (rep <= 10) {
  console.log(`WHILE: Lifting weights repetition ${rep}`);
  rep++;
}

let dice = Math.trunc(Math.random() * 6) + 1;
console.log(dice);

while (dice !== 6) {
  console.log(`You rolled a ${dice}`);
  dice = Math.trunc(Math.random() * 6) + 1;
  if (dice === 6) console.log("Loop is about to end...");
}
