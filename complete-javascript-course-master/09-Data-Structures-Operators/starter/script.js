'use strict';

const weekdays = ['monday', 'tuesday', 'wed', 'thur', 'friday', 'sat', 'sun'];

const openingHours = {
  [weekdays[3]]: {
    open: 12,
    close: 22,
  },
  [weekdays[2]]: {
    open: 11,
    close: 23,
  },
  sat: {
    open: 0, // Open 24 hours
    close: 24,
  },
};

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],
  //openingHours: openingHours,

  // ES6 Enhanced object literals
  openingHours,
  // openingHours: {
  //   thu: {
  //     open: 12,
  //     close: 22,
  //   },
  //   fri: {
  //     open: 11,
  //     close: 23,
  //   },
  //   sat: {
  //     open: 0, // Open 24 hours
  //     close: 24,
  //   },
  // },

  // order: function (starterIndex, mainIndex) {
  //   return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  // },

  // New way of writing methods
  order(starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  orderDeliver({ starterIndex = 1, mainIndex = 0, time = '20:00', address }) {
    console.log(
      `Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}.`
    );
  },

  orderPasta(ing1, ing2, ing3) {
    console.log(`Here is your delicious pasta with ${ing1}, ${ing2}, ${ing3}`);
  },

  orderPizza(mainIngredient, ...otherIngredients) {
    console.log(mainIngredient);
    console.log(otherIngredients);
  },
};

// String methods practice
// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

//console.log(flights.split('+'));

const getCode = (str) => str.slice(0, 3).toUpperCase();

for (const flight of flights.split('+')) {
  const [type, from, to, time] = flight.split(';');
  const output = `${type.startsWith('_Delayed') ? 'red' : ''}${type.replaceAll(
    '_',
    ' '
  )} from ${getCode(from)} to ${getCode(to)} (${time.replace(
    ':',
    'h'
  )})`.padStart(50, '-');
  console.log(output);
}

/*
/////////////////////////////////////////////
// Working with Strings - Part 3

console.log('a+very+nice+string'.split('+'));
console.log('Jonas Schmedtmann'.split(' '));

const [firstName, lastName] = 'Jonas Schmedtmann'.split(' ');

const newName = ['Mr.', firstName, lastName.toUpperCase()].join('+');
console.log(newName);

const capitalizeName = function (name) {
  const names = name.split(' ');
  const namesUpper = [];

  for (const n of names) {
    // namesUpper.push(n[0].toUpperCase() + n.slice(1));

    namesUpper.push(n.replace(n[0], n[0].toUpperCase()));
  }

  console.log(namesUpper.join(' '));
};

capitalizeName('jessica ann smith davis');
capitalizeName('gillian gavino');

// Padding
const message = 'Go to gate 23!';
console.log(message.padStart(25, '+').padEnd(35, '+'));
console.log('Jonas'.padStart(25, '+').padEnd(35, '-'));

const maskCreditCard = function (number) {
  const str = number + ''; // converts number to string
  const last = str.slice(-4);
  return last.padStart(str.length, '*');
};

console.log(maskCreditCard(55665657785454));
console.log(maskCreditCard('12367657545639'));

// Repeat method
const message2 = 'Bad weather... All departures delayed... ';

console.log(message2.repeat(5));

const planesInLine = function (num) {
  console.log(`There are ${num} planes in line ${'plane '.repeat(num)}!`);
};
planesInLine(5);
planesInLine(3);
planesInLine(12);
*/

/*
/////////////////////////////////////////////
// Working with Strings - Part 2
const airline = 'TAP Air Portugal';

console.log(airline.toLowerCase());
console.log(airline.toUpperCase());

// Fix capitalization in name
const passenger = 'jOnaS'; // Jonas
const passengerLower = passenger.toLowerCase();
const passengerRight =
  passengerLower[0].toUpperCase() + passengerLower.slice(1);
console.log(passengerRight);

// Check / Comparing emails
const email = 'hello@jonas.io';
const loginEmail = '  Hello@Jonas.IO   \n';
// const lowerEmail = loginEmail.toLowerCase();
// const trimmedEmail = lowerEmail.trim(); // trims extra spaces
// console.log(trimmedEmail); // hellojonas.io

const normalizedEmail = loginEmail.toLowerCase().trim();
console.log(normalizedEmail);
console.log(email === normalizedEmail);

// Replace parts of strings
const priceGB = '288,36P';
const priceUS = priceGB.replace('P', '$').replace(',', '.');
console.log(priceUS);

const announcement = 'All passengers come to boarding door 23! door';

console.log(announcement.replace('door', 'gate'));
console.log(announcement.replaceAll('door', 'gate'));
console.log(announcement.replaceAll(/door/g, 'gate'));

// Booleans
const plane = 'Airbus A320neo';
console.log(plane.includes('A320'));
console.log(plane.includes('Boeing'));
console.log(plane.startsWith('Air'));

if (plane.startsWith('Airbus') && plane.endsWith('neo'))
  console.log('Yes, they do');

// Practice exercise
const checkBaggage = function (items) {
  const baggage = items.toLowerCase();
  if (baggage.includes('knife') || baggage.includes('gun'))
    console.log('You are NOT allowed on board!');
  else console.log('Welcome aboard!');
};

checkBaggage('I have a laptop, some Food, and a pocket Knife');
checkBaggage('I have some socks and Camera');
checkBaggage('Got some snacks and a Gun for protection');
*/

/*
///////////////////////////////////////////
// Working with Strings - Part 1
const airline = 'TAP Air Portugal';
const plane = 'A320';

console.log(plane[0]);

console.log('B737'[0]);
console.log(airline.length);
console.log('B373'.length);

console.log(airline.indexOf('r'));
console.log(airline.lastIndexOf('r'));
console.log(airline.indexOf('Portugal'));

console.log(airline.slice(4)); // subtr
console.log(airline.slice(4, 7));

console.log(airline.slice(0, airline.indexOf(' ')));
console.log(airline.slice(airline.lastIndexOf(' ') + 1));

console.log(airline.slice(-2));
console.log(airline.slice(1, -1));

const checkMiddleSeat = function (seat) {
  // B and E are middle seats
  const s = seat.slice(-1);
  if (s === 'B' || s === 'E') console.log('You got the middle seat');
  else console.log('You got lucky ;)');
};

checkMiddleSeat('11B');
checkMiddleSeat('23C');
checkMiddleSeat('3E');

console.log(new String('jonas'));
*/

///////////////////////////////////////////
// Which Data Structure to use?

/*
// MAPS - ITERATION
const question = new Map([
  ['question', 'What is the best programming language in the world?'],
  [1, 'C'],
  [2, 'Java'],
  [3, 'JavaScript'],
  ['correct', 3],
  [true, 'Correct-to-mundo!'],
  [false, 'Try again!'],
]);

console.log(question);

// Convert object to map
console.log(Object.entries(openingHours));
const hoursMap = new Map(Object.entries(openingHours));
console.log(hoursMap);

// Quiz app
console.log(question.get('question'));
for (const [key, value] of question) {
  if (typeof key === 'number') console.log(`Answer ${key}: ${value}`);
}
// const answer = Number(prompt('Your answer'));
// console.log(answer);

// console.log(question.get(question.get('correct') === answer));
// question.get(true) // Correct-to-mundo!

// Convert map to an array
console.log([...question]);
console.log(question.entries());
console.log(question.keys());
console.log(question.values());
*/

/*
// MAPS - to map values to keys
// More useful than sets
const restMap = new Map();
// .set method is like adding
restMap.set('name', 'Classico Italiano');
restMap.set(1, 'Firenze, Italy');
restMap.set(2, 'Lisbon, Portugal');
console.log(restMap.set(2, 'Garda, Italy'));

restMap
  .set('categories', ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'])
  .set('open', 11)
  .set('close', 2200)
  .set(true, 'We are open')
  .set(false, 'We are closed');

console.log(restMap.get('name'));
console.log(restMap.get('categories'));

const time = 8;
console.log(
  restMap.get(time > restMap.get('open') && time < restMap.get('close'))
);

console.log(restMap.has('categories'));
restMap.delete(2);

const arr = [1, 2];
restMap.set(arr, 'Test');
restMap.set(document.querySelector('h1'), 'Heading');

console.log(restMap);
console.log(restMap.size);
//restMap.clear();

console.log(restMap.get(arr));
*/

/*
// SETS
// A set is a collection of unique values

const ordersSet = new Set([
  'Pasta',
  'Pizza',
  'Pizza',
  'Risotto',
  'Pizza',
  'Pasta',
]);
console.log(ordersSet);

console.log(new Set('Jonas'));

console.log(ordersSet.size);
console.log(ordersSet.has('Pizza'));
console.log(ordersSet.has('Bread'));
ordersSet.add('Garlic Bread');
ordersSet.add('Garlic Bread');
ordersSet.delete('Risotto');
//ordersSet.clear();
console.log(ordersSet);

for (const order of ordersSet) {
  console.log(order);
}

// Example real world
const staff = ['Waiter', 'Chef', 'Waiter', 'Manager', 'Chef', 'Waiter'];
const staffUnique = [...new Set(staff)];
console.log(staffUnique);

// Sets has no indexes, you dont need to retrieve values out of a set
*/

/*
// Looping objects, object keys, values, and entries

// Property NAMES
const properties = Object.keys(openingHours);
console.log(properties);

let openStr = `We are open on ${properties.length} days: `;

// for (const day of Object.keys(openingHours)) {
//   console.log(day);
// }

for (const day of properties) {
  openStr += ` ${day},`;
}
console.log(openStr);

// Property VALUES
const values = Object.values(openingHours);
console.log(values);

// Entire object
const entries = Object.entries(openingHours);
//console.log(entries);

// [key, value]
for (const [day, { open, close }] of entries) {
  console.log(`On ${day} we open at ${open} and close at ${close}`);
}
*/

/*
// Optional Chaining (.?)
if (restaurant.openingHours && restaurant.openingHours.mon)
  console.log(restaurant.openingHours.mon.open);

//console.log(restaurant.openingHours.mon.open);

// With optional chaining
console.log(restaurant.openingHours.mon?.open);
console.log(restaurant.openingHours.thur?.open);

console.log(restaurant.openingHours?.mon?.open);

// Example
const days = ['mon', 'tue', 'wed', 'thur', 'fri', 'sat', 'sun'];

for (const day of days) {
  console.log(day);
  const open = restaurant.openingHours[day]?.open ?? 'closed';
  //console.log(`On ${day}, we open at ${open}`);
}

// Methods (if it exists)
console.log(restaurant.orderRisotto?.(0, 1) ?? 'Method does not exist');

// Arrays
const users = [];
//const users = [{ name: 'Jonas', email: 'hello@joans' }];
console.log(users[0]?.name ?? 'User array empty');

if (users.length > 0) console.log(users[0].name);
else console.log('user array empty');

// if (restaurant.openingHours.thur)
//   console.log(restaurant.openingHours.thur.open);
*/

/*
// Enhanced Object Literals
// Changes in the objects above
*/

/*
// Looping over arrays FOR OF loop
const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];

for (const item of menu) {
  console.log(item);
}

// for (const item of menu.entries()) {
//   console.log(`${item[0] + 1}: ${item[1]}`);
// }

for (const [i, el] of menu.entries()) {
  console.log(`${i + 1}: ${el}`);
}
// console.log([...menu.entries()]);
*/

/*
// Logical Assignment Operators (ES 2021)
const rest1 = {
  name: 'Capri',
  //numGuests: 20,
  numGuests: 0,
};

const rest2 = {
  name: 'La Piazza',
  owner: 'Giovanni Rossi',
};

// OR assignment operator
// rest1.numGuests = rest1.numGuests || 10;
// rest2.numGuests = rest2.numGuests || 10;
// rest1.numGuests ||= 10;
// rest2.numGuests ||= 10;

// Nullish assignment operator
rest1.numGuests ??= 10;
rest2.numGuests ??= 10;

// AND assignment operator
// rest1.owner = rest1.owner && '<ANON>';
// rest2.owner = rest2.owner && '<ANON>';
rest1.owner &&= 'ANON';
rest2.owner &&= 'ANON';

console.log(rest1);
console.log(rest2);
*/

/*
// Nullish Coalescing Operator
restaurant.numGuests = 0;
const guests2 = restaurant.numGuests || 10;
console.log(guests2);

// Nullish: null and undefined ( NOT 0 or '' )
const guestCorrect = restaurant.numGuests ?? 10;
console.log(guestCorrect);
*/

/*
// Short circuiting (&& and ||)
console.log('----- OR ------');
// Properties of || operator: Use any data type, return aany data type, short-circuiting
console.log(3 || 'Jonas');
console.log('' || 'Jonas');
console.log(true || 0);
console.log(undefined || null); // undefined is a falsy value so it returns the last value

console.log(undefined || 0 || '' || 'Hello' || 23 || null);

restaurant.numGuests = 23;
const guests1 = restaurant.numGuests ? restaurant.numGuests : 10;
console.log(guests1);

const guests2 = restaurant.numGuests || 10;
console.log(guests2);

console.log('----- AND -----');
console.log(0 && 'Jonas');
console.log(7 && 'Jonas');

console.log('Hello' && 23 && null && 'Jonas');

// Practical example
if (restaurant.orderPizza) {
  restaurant.orderPizza('mushrooms', 'spinach');
}

restaurant.orderPizza && restaurant.orderPizza('mushrooms', 'spinach');
*/

/*
////////////////////////////////////////////
// 1) Destructuring

// Rest pattern and rest parameters
const arr = [1, 2, ...[3, 4]]; // SPREAD because on right side of the = [equal sign]

// REST syntax because on the left side of =
const [a, b, ...others] = [1, 2, 3, 4, 5];
console.log(a, b, others);

const [pizza, , rissoto, ...otherFood] = [
  ...restaurant.mainMenu,
  ...restaurant.starterMenu,
];
console.log(pizza, rissoto, otherFood);

// Objects
const { sat, ...weekdays } = restaurant.openingHours;
console.log(weekdays);

// 2) Functions
const add = function (...numbers) {
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i];
  }
  console.log(sum);
};

// REST
add(2, 3);
add(5, 3, 7, 3);
add(5, 4, 5, 6, 8, 7, 8);

const x = [23, 5, 7];
add(...x);

restaurant.orderPizza('mushrooms', 'onions', 'olives', 'spinach');

// ******** NOTES ON REST VS SPREAD ********* //
// Rest is used where we would write variable names separated by commas
// Spread is used where we would write values separated by commas
// ************* END OF NOTES ************** //
*/

/*
///////////////////////////////////////////////////////
// The spreaad ... operator

const arr = [7, 8, 9];
const badNewArr = [1, 2, arr[0], arr[1], arr[2]];
console.log(badNewArr);

const newArray = [1, 2, ...arr];
console.log(newArray);

console.log(...newArray);
console.log(1, 2, 7, 8, 9);

// creating a new array, not manipulating the original array
const newMenu = [...restaurant.mainMenu, 'Gnocci'];
console.log(newMenu);

// copy array
const mainMenuCopy = [...restaurant.mainMenu];

// join 2 arrays or more
const menu = [...restaurant.mainMenu, ...restaurant.starterMenu];
console.log(menu);

// Iterables: arrays, strings, maps, sets, NOT OBJECTS
const str = 'Jonas';
const letters = [...str, ' ', 'S.'];
console.log(...str);
// console.log(`${...str} Schmedtmann`);

// real world example
// const ingredients = [
//   prompt("Let's make pasta! Ingredient 1?"),
//   prompt('Ingredient 2?'),
//   prompt('Ingredient 3?'),
// ];
// console.log(ingredients);

// restaurant.orderPasta(ingredients[0], ingredients[1], ingredients[2])
// restaurant.orderPasta(...ingredients); // Better solution, great addition in ES6 jS

// Objects
const newRestaurant = { foundedIn: 1998, ...restaurant, founder: 'Guiseppe' };
console.log(newRestaurant);

const restaurantCopy = { ...restaurant };
restaurantCopy.name = 'Ristorante Roma';
console.log(restaurantCopy.name);

const newRestaurant1 = Object.assign({}, restaurant);
newRestaurant1.foundedIn = 1998;
newRestaurant1.founder = 'Guiseppe';
console.log(newRestaurant1);
*/

/*
///////////////////////////////////////////////
// Destructuring objects
restaurant.orderDeliver({
  time: '23:30',
  address: 'Via del Sole, 21',
  mainIndex: 2,
  starterIndex: 2,
});

restaurant.orderDeliver({
  address: 'Via del Sole, 21',
  starterIndex: 1,
});

const { name, openingHours, categories } = restaurant;
console.log(name, openingHours, categories);

// new variable names
const {
  name: restaurantName,
  openingHours: hours,
  categories: tags,
} = restaurant;
console.log(restaurantName, hours, tags);

// Default values = []
const { menu = [], starterMenu: starters = [] } = restaurant;
console.log(menu, starters);

// Mutating variables
let a = 111;
let b = 999;
const obj = { a: 23, b: 7, c: 14 };

({ a, b } = obj);
console.log(a, b);

// nested objects
const {
  fri: { open: o, close: c },
} = openingHours;
console.log(o, c);
*/

/*
//////////////////////////////////////////
// Destructuring arrays
const arr = [2, 3, 4];
const a = arr[0];
const b = arr[1];
const c = arr[2];

const [x, y, z] = arr;
console.log(x, y, z);
console.log(arr);

let [main, , secondary] = restaurant.categories;
console.log(main, secondary);

// switching variables
// const temp = main;
// main = secondary;
// secondary = temp;
// console.log(main, secondary);

// destructuring technique
[main, secondary] = [secondary, main];
console.log(main, secondary);

// Receive 2 return values from a function
const [starter, mainCourse] = restaurant.order(2, 0); // indexes
console.log(starter, mainCourse);

// Nested destructuring
const nested = [2, 4, [5, 6]];
// const [i, , j] = nested;
// console.log(i, j);
const [i, , [j, k]] = nested;
console.log(i, j, k);

// Default values
const [p = 1, q = 1, r = 1] = [8];
console.log(p, q, r);
*/
