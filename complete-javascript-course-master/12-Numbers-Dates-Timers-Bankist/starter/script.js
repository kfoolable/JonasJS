'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2023-11-20T17:01:17.194Z',
    '2023-11-23T23:36:17.929Z',
    '2023-11-26T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
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

/////////////////////////////////////////////////
// Functions

const formatMovementDate = function (date, locale) {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs((date2 - date1) / (1000 * 60 * 60 * 24)));

  const dayPassed = calcDaysPassed(new Date(), date);
  //console.log(dayPassed); // days passed since the current day

  if (dayPassed === 0) return 'Today';
  if (dayPassed === 1) return 'Yesterday';
  if (dayPassed <= 7) return `${dayPassed} days ago`;

  // const day = `${date.getDate()}`.padStart(2, '0');
  // const month = `${date.getMonth() + 1}`.padStart(2, '0');
  // const year = date.getFullYear();
  // return `${day}/${month}/${year}`;
  return new Intl.DateTimeFormat(locale).format(date);
};

const formatCur = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
};

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const date = new Date(acc.movementsDates[i]);
    const displayDate = formatMovementDate(date, acc.locale);

    const formattedMov = formatCur(mov, acc.locale, acc.currency);

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${formattedMov}</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);

  labelBalance.textContent = formatCur(acc.balance, acc.locale, acc.currency);
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = formatCur(incomes, acc.locale, acc.currency);

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = formatCur(Math.abs(out), acc.locale, acc.currency);

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = formatCur(interest, acc.locale, acc.currency);
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

const startLogoutTimer = function () {
  const tick = function () {
    // convert time to minutes and seconds
    const min = String(Math.trunc(time / 60)).padStart(2, '0');
    const sec = String(time % 60).padStart(2, '0');
    // in each call, print the remaining time to UI
    labelTimer.textContent = `${min}:${sec}`;

    // when the time is 0, stop timer and logout user
    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = 'Log in to get started';
      containerApp.style.opacity = 0;
    }

    // Decrease 1 second
    time--;
  };
  // set time to 5 minutes
  let time = 30;

  // Call the timer every second
  tick(); // separated function because setInterval has a one second delay before being called so we want it to be in a different function to get called instantly
  const timer = setInterval(tick, 1000);

  return timer;
};

///////////////////////////////////////
// Event handlers
let currentAccount, timer;

// FAKE ALWAYS LOGGED IN /////////
// currentAccount = account1;
// updateUI(currentAccount);
// containerApp.style.opacity = 100;
//////////////////////////////////

// const now = new Date();
// const day = `${now.getDate()}`.padStart(2, '0');
// const month = `${now.getMonth() + 1}`.padStart(2, '0');
// const year = now.getFullYear();
// const hour = now.getHours();
// const min = now.getMinutes();
// labelDate.textContent = `${day}/${month}/${year}, ${hour}:${min}`;
// // day/month/year

// Experimenting with intl API
// const now = new Date();
// const options = {
//   hour: 'numeric',
//   minute: 'numeric',
//   day: 'numeric',
//   month: 'long', // long gives the name of the month // others are 'numeric', '2-digit'- 09
//   year: 'numeric',
//   weekday: 'long',
// };
// const locale = navigator.language; // takes the format of your computer locale
// console.log(locale);

// labelDate.textContent = new Intl.DateTimeFormat(locale, options).format(now);
// locale codes: en-US, en-GB, ar-SY ...
// iso language codes on lingoes.net

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === +inputLoginPin.value) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // // create current date and time
    // const now = new Date();
    // const day = `${now.getDate()}`.padStart(2, '0');
    // const month = `${now.getMonth() + 1}`.padStart(2, '0');
    // const year = now.getFullYear();
    // const hour = `${now.getHours()}`.padStart(2, '0');
    // const min = `${now.getMinutes()}`.padStart(2, '0');
    // labelDate.textContent = `${day}/${month}/${year}, ${hour}:${min}`;
    // // day/month/year

    const now = new Date();
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
      // weekday: 'long',
    };
    // const locale = navigator.language; // takes the format of your computer locale
    // console.log(locale);

    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(now);

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    if (timer) clearInterval(timer);
    timer = startLogoutTimer();

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = +inputTransferAmount.value;
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
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

    // Add transfer date
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());

    // Update UI
    updateUI(currentAccount);

    // Reset timer
    clearInterval(timer);
    timer = startLogoutTimer();
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  // Math.floor is used when loaning, the cents are rounded down bc no bank loans with cents lol
  const amount = Math.floor(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    setTimeout(function () {
      // Add movement
      currentAccount.movements.push(amount);

      // add loan date
      currentAccount.movementsDates.push(new Date().toISOString());

      // Update UI
      updateUI(currentAccount);

      // Reset timer
      clearInterval(timer);
      timer = startLogoutTimer();
    }, 2500);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    +inputClosePin.value === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

/*
// LESSON 1 - Number methods
console.log(23 === 23.0); // true

// Base 10 - 10 to 9
// Binary base 2 - 0 to 1
console.log(0.1 + 0.2); // 0.30000000000000004

// Conversion
console.log(Number('23')); // Number 23
console.log(+'23'); // number 23 // better way to convert to Number

// Parsing
console.log(Number.parseInt('30px', 10)); // 30 number
console.log(Number.parseInt('e23', 10)); // NaN
// 10 parameter is to avoids bugs

console.log(Number.parseInt(' 2.5rem')); // 2
console.log(Number.parseFloat('  2.5rem  ')); // 2.5

// console.log(parseFloat(' 2.5rem ')); // 2.5

console.log(Number.isNaN(20)); // false
console.log(Number.isNaN('20')); // false
console.log(Number.isNaN(+'20X')); // true
console.log(Number.isNaN(23 / 0)); // false // Infinity is not a Number

// best way of checking if a value is a real number
console.log(Number.isFinite(20)); // true
console.log(Number.isFinite('20')); // false
console.log(Number.isFinite(+'20X')); // false
console.log(Number.isFinite(23 / 0)); // false

console.log(Number.isInteger(23)); // true
console.log(Number.isInteger(23.0)); // true 
console.log(Number.isInteger(23 / 0)); // false
*/

/*
// LESSON 2 - Math and rounding

console.log(Math.sqrt(25)); // 5
console.log(25 ** (1 / 2)); // 5
console.log(8 ** (1 / 3)); // 2 // cubic root

console.log(Math.max(5, 18, 23, 11, 2)); // 23
console.log(Math.max(5, 18, '23', 11, 2)); // 23 // it does type coercion
console.log(Math.max(5, 18, '23px', 11, 2)); // NaN

console.log(Math.min(5, 18, 23, 11, 2)); // 2

console.log(Math.PI); // 3.141592653589793
console.log(Math.PI * Number.parseFloat('10px') ** 2); // calculates the area of a circle // 314.1592653589793

console.log(Math.random()); // random value from 0 to 1

console.log(Math.trunc(Math.random() * 6)); // 0 - 5
console.log(Math.trunc(Math.random() * 6) + 1); // 0 - 6

const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min) + 1) + min; // plus min is plus 10, because if you dont add this, the values returned will only be 1 - 10, but if you have + min (10) then the values will be from 10 - 20
// 0...1 => 0...(max - min) => min...(max - min + min) => min...max
console.log(randomInt(10, 20)); // values from 10...20

// Rounding integers
console.log(Math.trunc(23.3)); // 23 // removes decimal parts

console.log(Math.round(23.3)); // 23
console.log(Math.round(23.9)); // 24

console.log(Math.ceil(23.3)); // 24
console.log(Math.round(23.9)); // 24

console.log(Math.floor(23.3)); // 23
console.log(Math.floor('23.9')); // 23

console.log(Math.trunc(23.3)); // kinda similar with floor

console.log(Math.trunc(-23.3)); // -23
console.log(Math.floor(-23.3)); // -24
// floor is a bit better than trunc because it works with any values whether positive or negative

// Rounding decimals / floating point numbers
console.log((2.7).toFixed(0)); // 3 // will always return a string
console.log((2.7).toFixed(3)); // 2.700 // it has 3 decimal parts, but is a string
console.log((2.345).toFixed(2)); // 2.35
console.log(+(2.345).toFixed(2)); // 2.35 number

// For more Math functions, check out the MDN docs for reference
*/

/*
// LESSON 3 - Remainder operator
console.log(5 % 2); // 1
console.log(5 / 2); // 2.5

console.log(8 % 3); // 2
console.log(8 / 3); // 2.666666666665 // 8 = 2 * 3 + 2

console.log(6 % 2); // 0
console.log(6 / 2); // 3

const isEven = n => n % 2 === 0;
console.log(isEven(8)); // true
console.log(isEven(513)); // false

labelBalance.addEventListener('click', function () {
  [...document.querySelectorAll('.movements__row')].forEach(function (row, i) {
    // 0, 2, 4, 6 ...
    if (i % 2 === 0) row.style.backgroundColor = 'orangered';
    // 0, 3, 6, 9 ...
    if (i % 3 === 0) row.style.backgroundColor = 'blue';
  });
});
*/

/*
// LESSON 4 - Numeric separators

// 287,460,000,000
const diameter = 287_460_000_000;
console.log(diameter); // 287460000000

const price = 345_99;
console.log(price); // 34599

const transferFee1 = 15_00;
const transferFee2 = 1_500;
console.log(transferFee2.toFixed(3)); // 1500.000

// const PI = 3.__1415;
// console.log(PI); // error

console.log(Number('230_000')); // NaN
console.log(parseInt('230_000')); // 230
*/

/*
// LESSON 5 - Working with BigInt
// type of integers introduced in ES2020

// biggest number that JS can represent
console.log(2 ** 53 - 1); // 9007199254740991
console.log(Number.MAX_SAFE_INTEGER); // 9007199254740991
console.log(2 ** 53 + 1);
// 9007199254740994; // not accurate

console.log(23453453453453543534534534456456745756756); // 2.3453453453453543e+40 // not accurate
console.log(23453453453453543534534534456456745756756n); // 23453453453453543534534534456456745756756n // n turns the number into a really huge number and displays it accurately
console.log(BigInt(23453453453453543534534534456456745756756)); // different than the first one
// console.log(Math.sqrt(16n)); // error

// Operations
console.log(10000n + 10000n); // 20000n
console.log(234242342342534645674534n * 34324234234234234234234234n);

const huge = 32435645654645645645645645645n;
const num = 23;
console.log(huge * BigInt(num)); // error w/o BigInt cannot mix big in with other types // but with BigInt, it fixes it

// Exceptions
console.log(20n > 15); // true
console.log(20n === 20); // false
console.log(typeof 20n); // bigInt
console.log(20n == '20'); // true // type coercion

//
console.log(huge + ' is REALLY big!!!'); // 32435645654645645645645645645 is REALLY big!!!

// Divisions
console.log(12n / 3n); // 4n // it cuts off the decimal parts
console.log(10 / 3); // 3.3333333333333335
*/

/*
// LESSON 6 - Creating Dates
// Create a date
/*
const now = new Date();
console.log(now); // current date now

console.log(new Date('Nov 25 2023 22:31:23')); // Sat Nov 25 2023 22:31:23 GMT+0800 (Philippine Standard Time)
console.log(new Date('December 24, 2015')); // Thu Dec 24 2015 00:00:00 GMT+0800 (Philippine Standard Time)
// generally not a good practice to do this

console.log(new Date(account1.movementsDates[0])); // Tue Nov 19 2019 05:31:17 GMT+0800 (Philippine Standard Time)

console.log(new Date(2037, 10, 19, 15, 23, 5)); // Thu Nov 19 2037 15:23:05 GMT+0800 (Philippine Standard Time) // month is 0 based
console.log(new Date(2037, 10, 31)); // Tue Dec 01 2037 15:23:05 GMT+0800 (Philippine Standard Time) // auto corrects to Dec 01

console.log(new Date(0)); // Thu Jan 01 1970 08:00:00 GMT+0800 (Philippine Standard Time)
console.log(new Date(3 * 24 * 60 * 60 * 1000)); // Sun Jan 04 1970 08:00:00 GMT+0800 (Philippine Standard Time)
//

// Working with dates
const future = new Date(2037, 10, 19, 15, 23);
console.log(future); // Thu Nov 19 2037 15:23:00 GMT+0800 (Philippine Standard Time)
console.log(future.getFullYear()); // 2037
console.log(future.getMonth()); // 10
console.log(future.getDate()); // 19
console.log(future.getDay()); // 4 (Thursday)
console.log(future.getHours());
console.log(future.getMinutes());
console.log(future.getSeconds());
console.log(future.toISOString()); // 2037-11-19T07:23:00.000Z
console.log(future.getTime()); // 2142228180000 time stamp since 1970

console.log(new Date(2142228180000)); // Thu Nov 19 2037 15:23:00 GMT+0800 (Philippine Standard Time) // reversed it and it gave the time

console.log(Date.now()); // time stamp : 1700923381122

future.setFullYear(2040);
console.log(future); // Mon Nov 19 2040 15:23:00 GMT+0800 (Philippine Standard Time)
*/

// LESSON 7 - Adding Dates to Bankist app

/*
// LESSON 8 - Operations with Dates
const future = new Date(2037, 10, 19, 15, 23);
console.log(Number(future)); // 2142228180000
console.log(+future);

const calcDaysPassed = (date1, date2) =>
  Math.abs((date2 - date1) / (1000 * 60 * 60 * 24));

const days1 = calcDaysPassed(new Date(2037, 3, 14), new Date(2037, 3, 4));
console.log(days1); // 864000000 milliseconds // after calculatiion = 10 days

// Changes to the app, with stating dates and descriptions of transactions
// Review logic of passing dates in displayMovements function propery to understand it better
// in the newly made formatDate function, you learned that when a return is already passed, the code stops running lines of code after; this is in relation with the one liner if statements wiith returns.

// LESSON 9 - Internationalizing Dates (INTL)
// changed in the app above
// more information on intl in the mdn docs
*/

/*
// LESSON 10 - Internationalizing Numbers
const num = 384324234.23;

const options = {
  style: 'currency', // percent ignores the units property now bc of the percent // currency needs to be defined
  unit: 'celsius', // more units in the docs
  currency: 'EUR', // currency needs to be set
  // useGrouping: false, // false gets rid of the commas
  // more props on mdn
};

console.log('US: ', new Intl.NumberFormat('en-US').format(num)); // US: 384,324,234.23, its now formatted with comas according to US number standards
console.log('Germany: ', new Intl.NumberFormat('de-DE').format(num)); // Germany:  384.324.234,23
console.log('Syria: ', new Intl.NumberFormat('ar-SY').format(num)); // Syria:  ٣٨٤٬٣٢٤٬٢٣٤٫٢٣
console.log(
  navigator.language,
  new Intl.NumberFormat(navigator.language).format(num)
); // en-US 384,324,234.23

console.log('US: ', new Intl.NumberFormat('en-US', options).format(num)); // mph
console.log('Germany: ', new Intl.NumberFormat('de-DE', options).format(num)); // mi/h
console.log('Syria: ', new Intl.NumberFormat('ar-SY', options).format(num)); // ميل/س
console.log(
  navigator.language,
  new Intl.NumberFormat(navigator.language, options).format(num)
); // mph
*/

// LESSON 11 - Timers: setTimeout and setInterval
/*
// setTimeout
// schedules a schedule after a certain amount of time and the function only runs once
setTimeout(() => console.log('Here is your pizza!'), 3000); // 3000 milliseconds is 3 seconds
console.log('Waiting...'); // setTimeout doesnt stop code execution, it just delays it
// this is async JS

setTimeout(
  (ing1, ing2) => console.log(`Here is your pizza with ${ing1} and ${ing2}!`),
  3000,
  'olives', // 3rd arguments is the first parameter
  'spinach' // 4th argument
); // the 2 arguments are read after the milleseconds

const ingredients = ['olives', 'spinach'];

const pizzaTimer = setTimeout(
  (ing1, ing2) => console.log(`Here is your pizza with ${ing1} and ${ing2}!`),
  3000,
  ...ingredients
);

if (ingredients.includes('spinach')) clearTimeout(pizzaTimer); // it doesnt log
*/

// setInterval
// runs a function every so and so seconds or minutes
// setInterval(function () {
//   const now = new Date();
//   console.log(now);
// }, 1000);

// setInterval(function () {
//   const now = new Date();
//   const hour = `${now.getHours()}`.padStart(2, '0');
//   const minute = now.getMinutes();
//   const seconds = `${now.getSeconds()}`.padStart(2, '0');
//   console.log(`${hour} : ${minute} : ${seconds}`);
// }, 1000);
