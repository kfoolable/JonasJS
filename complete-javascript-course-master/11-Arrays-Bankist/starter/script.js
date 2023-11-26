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
const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = ''; // removes the placeholder html
  // .textContent = 0;

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
      <div class="movements__value">${mov} €</div>
    </div>
    `;
    containerMovements.insertAdjacentHTML('afterbegin', html); // more on mdn docs
  });
};
// console.log(containerMovements.innerHTML);

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance} €`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter((mov) => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes} €`;

  const out = acc.movements
    .filter((mov) => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)} €`;

  const interest = acc.movements
    .filter((mov) => mov > 0)
    .map((deposit) => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      //console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest}€`;
};

const createUsernames = function (accs) {
  // distiinction whether to use map or filter
  accs.forEach(function (acc) {
    acc.username = acc.owner // acc.username added a new property to the accounts array objects
      .toLowerCase()
      .split(' ')
      .map((name) => name[0]) // arrow function
      .join('');
  });
};
createUsernames(accounts);

// console.log(accounts);
// const user = 'Steven Thomas Williams'; // stw
// console.log(username); // ['steven', 'thomas', 'williams'] // stw (string)

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc.movements);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

// Even handlers
let currentAccount;

btnLogin.addEventListener('click', function (e) {
  // Prevents form from submitting and reloading the page
  e.preventDefault();

  // important part of the code in understanding find
  currentAccount = accounts.find(
    (acc) => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  // optional chaining
  // the pin property can only be read if the currentAccount exists
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and welcome message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur(); // loses focus on the element, meaning it removes the cursor blink

    // // Display movements
    // displayMovements(currentAccount.movements);

    // // Display balance
    // calcDisplayBalance(currentAccount);

    // // Display summary
    // calcDisplaySummary(currentAccount);

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    (acc) => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // Update UI
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if (
    amount > 0 &&
    currentAccount.movements.some((mov) => mov >= amount * 0.1)
  ) {
    // Add  movement
    currentAccount.movements.push(amount);

    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    Number(inputClosePin.value) === currentAccount.pin &&
    inputCloseUsername.value === currentAccount.username
  ) {
    const index = accounts.findIndex(
      (acc) => acc.username === currentAccount.username
    );
    console.log(index);

    accounts.splice(index, 1); // deletes the account from the accounts array

    // Hide UI
    containerApp.style.opacity = 0;
  }
  console.log(accounts);
  inputCloseUsername.value = inputClosePin.value = '';
});

let sortedState = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sortedState);
  sortedState = !sortedState;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);
// console.log(currencies);
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

/*
// LESSON 1 - Array methods
let arr = ['a', 'b', 'c', 'd', 'e'];

// SLICE
// parameter takes where to start slicing
console.log(arr.slice(2));
console.log(arr.slice(2, 4));
console.log(arr.slice(-2)); // starts from the end of the array
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
console.log(arr2); // original array but reversed

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

console.log(arr.at(-1)); // 64 //easier method to take the last element

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
  // arguments are (values of the array, index, and the array itself)
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
  // console.log(map); // shows the entire map
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
// no new array -- same array, just with one value

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

/*
// LESSON 7 - filter method
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const deposits = movements.filter(function (mov) {
  return mov > 0; // boolean
});
console.log(movements);
console.log(deposits); // removed the negative values

// for of comparison
const depositsFor = [];
for (const mov of movements) {
  if (mov > 0) {
    depositsFor.push(mov);
  }
}
console.log(depositsFor);

const withdrawals = movements.filter((mov) => mov < 0);
console.log(withdrawals);
*/

/*
// LESSON 8 - reduce method
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
console.log(movements);
// accumulator --> snowball
// const balance = movements.reduce(function (acc, cur, i, arr) {
//   console.log(`Iteration number ${i}: ${acc}`);
//   return acc + cur;
// }, 0); // 0 is the initial value of the accumulator
const balance = movements.reduce((acc, cur) => acc + cur);
console.log(balance);

let balance2 = 0;
for (const mov of movements) {
  balance2 += mov;
}
console.log(balance2);

// Maximum value of the movements array
const max = movements.reduce((acc, cur) => {
  if (acc > cur) return acc;
  else return cur;
}, movements[0]);
console.log(max);
*/

/*
// LESSON 9 - Chaining Methods
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const eurToUsd = 1.1;

// PIPELINE
const totalDepositsToUSD = movements
  .filter((mov) => mov > 0)
  .map((mov) => mov * eurToUsd)
  .reduce((acc, mov) => acc + mov, 0);
console.log(totalDepositsToUSD);
*/
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/*
// LESSON 10 - find method
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// it also loops over the array, retrieves an element of the array
// its kinda like the filter method
// but it does not return a new array, it will just return the first element for which the condition is true
const firstWithdrawal = movements.find((mov) => mov < 0);
console.log(movements);
console.log(firstWithdrawal);

// console.log(accounts);

// const account = accounts.find((acc) => acc.owner === 'Jessica Davis');
// console.log(account);

// let jessicasAccount;
// for (const account of accounts) {
//   if (account.owner === 'Jessica Davis') {
//     jessicasAccount = account;
//     break;
//   }
// }
// console.log(jessicasAccount);
*/

/*
// LESSON 11 - some and every method

// EQUALITY
console.log(movements);
console.log(movements.includes(-130)); // true // bc if -130 is present in the array, it returns true

// some
// CONDITION
const anyDeposits = movements.some((mov) => mov > 0);
console.log(anyDeposits); // true

// every
console.log(movements.every((mov) => mov > 0)); // false
console.log(account4.movements.every((mov) => mov > 0)); // true // bc all values in this account array are positive values

// separate callback function
const deposit = (mov) => mov > 0;

console.log(movements.every(deposit));
console.log(movements.some(deposit));
console.log(movements.filter(deposit));
*/

/*
// LESSON 12 - flat and flatMap methods
const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
console.log(arr.flat()); // removed the nested arrays, and flattened it to only one single new array
// flat method only goes one level deep

const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];
console.log(arrDeep.flat(2)); // 2 levels deep

// const accountMovements = accounts.map((acc) => acc.movements);
// console.log(accountMovements);
// const allMovements = accountMovements.flat();
// console.log(allMovements);
// const overallBalance = allMovements.reduce((acc, cur) => acc + cur, 0);
// console.log(overallBalance);

// chaining overallBalance
// flat
const overallBalance2 = accounts
  .map((acc) => acc.movements)
  .flat()
  .reduce((acc, cur) => acc + cur, 0);
console.log(overallBalance2);

// flatMap is a method that combines map and flat
const overallBalance3 = accounts
  .flatMap((acc) => acc.movements)
  .reduce((acc, cur) => acc + cur, 0);
console.log(overallBalance2);
// flatMap only goes 1 level deep
*/

/*
// LESSON 13 - SORTING ARRAYS
// Strings
const owners = ['Jonas', 'Gillian', 'Zach', 'Adam', 'Martha'];
console.log(owners.sort()); // a - z
console.log(owners); // mutates the original array

// Numbers (converts everything to strings)
console.log(movements);
// console.log(movements.sort());
// a and b parameters are two consecutive numbers in the array

// return < 0, A, B (keep order)
// return > 0 B, A (switch order)

// Ascending
// movements.sort((a, b) => {
//   if (a > b) return 1;
//   if (b > a) return -1;
// });
movements.sort((a, b) => a - b); // same concept as above
console.log(movements);

// Descending
// movements.sort((a, b) => {
//   if (a > b) return -1;
//   if (b > a) return 1;
// });
movements.sort((a, b) => b - a);
console.log(movements);
*/

/*
// LESSON 14 - More ways of creating and filling arrays
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log(new Array(1, 2, 3, 4, 5, 6, 7));

const x = new Array(7);
console.log(x); // 7 empty values
x.map(() => 5); // nothing happens here
console.log(x);

// fill method
// x.fill(1); // fills the array, and mutates it
// console.log(x); // 7 1s

// x.fill(1, 3);
// console.log(x); // starts at index 3 with 1s

// kinda like slice
x.fill(1, 3, 5); // 5 is where the index ends
console.log(x);

// non - empty arrays
arr.fill(23, 2, 6); // mutates the array
console.log(arr);

// Array.from
const y = Array.from({ length: 7 }, () => 1);
console.log(y); // 7 1s

const z = Array.from({ length: 7 }, (_, i) => i + 1);
console.log(z); // 1 - 7 values

const randomDice = Array.from({ length: 100 }, () =>
  Math.floor(Math.random() * 6 + 1)
);
// console.log(randomDice);

labelBalance.addEventListener('click', function () {
  const movementsUI = Array.from(
    document.querySelectorAll('.movements__value'),
    (el) => Number(el.textContent.replace('€', ''))
  );

  console.log(movementsUI);

  // alternate method, but Array.from is preferable
  // because this method, you have to create a separate
  // function to convert it to an array
  const movementsUI2 = [...document.querySelectorAll('.movements__value')];
});
*/

/*
// Which array method to use?
* To mutate the original array *
- add to original:
  - .push (end)
  - .unshift (start)

- remove from original:
  - .pop (end)
  - .shift (start)
  - .splice (any)

- Others:
  - .reverse
  - .sort
  - .fill

* A new array *
- computed from original:
  - .map (loop)

- fitered using condition:
  - .filter

- portion of original
  - .slice

- adding original to other:
  - .concat

- flattening the original:
  - .flat
  - .flatMap

* An array index *
- based on value:
  - .indexOf
  - .findIndex // search an element based on a condition

* An array element *
- based on test condition:
  - .find

* Know if array includes
- based on value:
  - .includes

- based on test condition:
  - .some
  - .every

* A new string *
- based on separator string:
  - .join

* To transform to value *
- based on accumulator:
  - .reduce

* To loop array *
- based on callback:
  - .forEach
*/

// Array Cardio Exercises
// 1.
const bacnkDepositSum = accounts
  .flatMap((acc) => acc.movements)
  .filter((mov) => mov > 0)
  .reduce((sum, cur) => sum + cur, 0);

console.log(bacnkDepositSum); // 25180 // sum of all movements account

// 2.
// const numDeposits1000 = accounts
//   .flatMap((acc) => acc.movements)
//   .filter((acc) => acc >= 1000).length;

const numDeposits1000 = accounts
  .flatMap((acc) => acc.movements)
  .reduce((count, cur) => (cur >= 1000 ? ++count : count), 0);

console.log(numDeposits1000); // 6 // count of movements more than 1000

// Prefixed operator
let a = 10;
console.log(++a); // 11

// 3.
const { deposits, withdrawals } = accounts // accounts array with account objects
  .flatMap((acc) => acc.movements)
  .reduce(
    (sums, cur) => {
      // cur > 0 ? (sums.deposits += cur) : (sums.withdrawals += cur);
      sums[cur > 0 ? 'deposits' : 'withdrawals'] += cur; // sums['deposits]/sums['withdrawals'] => same as sums.deposits, if you recall object destructuring lectures
      return sums;
    },
    { deposits: 0, withdrawals: 0 } // accumulator
  );

console.log(deposits, withdrawals); // 25180, -7340 // sum of deposits and withdrawals

// 4.
// this is a nice title -> This Is a Nice Title
const convertTitleCase = function (title) {
  const capitalize = (str) => str[0].toUpperCase() + str.slice(1);

  const exceptions = ['a', 'an', 'and', 'the', 'but', 'or', 'on', 'in', 'with'];

  const titleCase = title
    .toLowerCase()
    .split(' ')
    .map((word) => (exceptions.includes(word) ? word : capitalize(word)))
    .join(' ');
  return capitalize(titleCase);
};

console.log(convertTitleCase('this is a nice title'));
console.log(convertTitleCase('this is a LONG title but Not too long'));
console.log(convertTitleCase('and here is another title with an EXAMPLE'));
