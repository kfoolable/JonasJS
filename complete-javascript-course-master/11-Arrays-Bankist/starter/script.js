'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

// Creating DOM elements
const displayMovements = function (movements) {
  containerMovements.innerHTML = ''; // removes the placeholder html
  // .textContent = 0;
  movements.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
      <div class="movements__value">${mov}</div>
    </div>
    `;
    containerMovements.insertAdjacentHTML('afterbegin', html); // more on mdn docs
  });
};
displayMovements(account1.movements);
// console.log(containerMovements.innerHTML);

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

/*
// LESSON 1 - Array methods
let arr = ['a', 'b', 'c', 'd', 'e'];

// SLICE
// parameter takes where to start slicing
console.log(arr.slice(2));
console.log(arr.slice(2, 4));
console.log(arr.slice(-2)); // from the end of the array
console.log(arr.slice(-1));
console.log(arr.slice(1, -2)); // starts from b, then takes everything until -2 index from the end (d)
console.log(arr.slice()); // creates a shallow copy of the array
console.log([...arr]); // same as above - shallow copy

// SPLICE
// mutates the original array
// console.log(arr.splice(2));
// arr.splice(-1); // removes the last element
// console.log(arr); // splice mutates the original array

// arr.splice(1, 2); // first param is the index, second param is number of elements to remove
// console.log(arr); // removed b and c

// REVERSE
// also mutates the original array
const arr2 = ['j', 'i', 'h', 'g', 'f'];

console.log(arr2.reverse());
console.log(arr2);

// CONCAT
// concatenate two arrays

const letters = arr.concat(arr2);
console.log(letters);
console.log([...arr, ...arr2]); // same as above

// JOIN
console.log(letters.join(' - '));
*/

/*
// LESSON 2 - The New At Method
// Introduced in ES2022

const arr = [23, 11, 64];
console.log(arr[0]); // traditionally // 23

console.log(arr.at(0)); // 23
console.log(arr[arr.length - 1]); // 64
console.log(arr.slice(-1)[0]); // 64 - creates a new array

console.log(arr.at(-1)); // 64

// This method is mostly used to get the last value of an array. at method makes it easier
*/

/*
// LESSON 3 - Looping Arrays - forEach
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// for (const movement of movements) {
for (const [i, movement] of movements.entries()) {
  if (movement > 0) {
    console.log(`Movement ${i + 1}: You deposited ${movement}`);
  } else {
    console.log(`Movement ${i + 1}: You withdrew ${Math.abs(movement)}`); // Math.abs removes the sign
  }
}

console.log('------ forEach ------');
movements.forEach(function (movement, index, array) {
  // arguments are (values of the array, index, and teh array itself)
  if (movement > 0) {
    console.log(`Movement ${index + 1}: You deposited ${movement}`);
  } else {
    console.log(`Movement ${index + 1}: You withdrew ${Math.abs(movement)}`); // Math.abs removes the sign
  }
});
// 0: function(200)
// 1: function(450)
// 2: function(400)
// ...
*/

/*
// LESSON 4 - forEach with maps and sets
//MAP
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

currencies.forEach(function (value, key, map) {
  // first parameter is the value, second is key and the third one is the array/map
  console.log(`${key}: ${value}`);
  // console.log(map);
});

// SET
const currenciesSet = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);

console.log(currenciesSet);

currenciesSet.forEach(function (value, _, map) {
  console.log(`${value}: ${value}`); // the key is the same as the value
  // why? set doesnt have keys, and doesnt have  indexes
});
*/

// LESSON 5 - Data Transformation: map, filter, reduce
// map
// map is kinda the same as forEach loop, it loops through the array, except it creates a new array doing so
// map returns a new array containing the results of applying an operation on all original array elements

// filter
// filter returns a new array containing the array elements that passed a specified test condition

// reduce
// reduce boils ("reduces") all array elements down to one single value (eg adding all elements together)
// no new array

/*
// LESSON 6 - The map method
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const eurToUsd = 1.1;

// const movementsUsd = movements.map(function (mov) {
//   return mov * eurToUsd;
// });

// arrow function challenge
const movementsUsd = movements.map((mov) => mov * eurToUsd);

console.log(movements);
console.log(movementsUsd);

const movementsUsdfor = [];
for (const mov of movements) {
  movementsUsdfor.push(mov * eurToUsd);
}

console.log(movementsUsdfor);

const movementsDescriptions = movements.map(
  (mov, i) =>
    `Movement ${i + 1}: You ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(
      mov
    )}`
);
console.log(movementsDescriptions);
*/
