console.log("script.js file");

// let js = "amazing";
// console.log(40 + 9 + 23 - 10);

// console.log("Jonas"); //<--- Jonas is a value

// let javascriptIsFun = true;

// console.log(typeof javascriptIsFun);

// let year;
// console.log(year);
// console.log(typeof year);

// year = 1998;
// console.log(typeof year);

// console.log(typeof null);

// let age = 30; // let is mutable
// age = 33; // mutated variable (changed)

// const birthYear = 1998; // immutable (cannot be changed)
// // birthYear = 1990;

// const now = 2037;
// const ageJonas = now - 1998;
// const ageSarah = now - 2019;
// console.log(ageJonas, ageSarah);

// console.log(ageJonas * 2, ageJonas / 10, 2 ** 3);

// const firstName = "Gil";
// const lastName = "Gavino";

// console.log(firstName + " " + lastName);

// let x = 10 + 5;
// x += 10; // x = x + 10
// console.log(x); // 25

// console.log(ageJonas > ageSarah);
// console.log(ageSarah >= 18);

// const age = 15;
// const isOldEnough = age >= 18;

// if (isOldEnough) {
//   console.log("Sarah can have a driver's license");
// } else {
//   const yearsLeft = 18 - age;
//   console.log(`Wait another ${yearsLeft} years`);
// }

// const inputYear = "1991";
// console.log(Number(inputYear));
// console.log(Number(inputYear) + 18);

// console.log(typeof NaN);

// console.log(String(23), 23);

// const hasDriversLicense = true;
// const hasGoodVision = false;

// console.log(hasDriversLicense && hasGoodVision);
// console.log(hasDriversLicense || hasGoodVision);
// console.log(!hasDriversLicense);

const day = "monday";

switch (day) {
  case "monday":
    console.log("Plan my course structure");
    console.log("Go to coding meetup");
    break;
  case "tuesday":
  case "wednesday":
    console.log("Write code examples");
    break;
}

const age = 23;

age >= 18
  ? console.log("I like to drink wine")
  : console.log("I like to drink water");
