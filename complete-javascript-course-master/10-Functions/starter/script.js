'use strict';

/*
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
createBooking('LH123', 2, 800); // override default values
createBooking('LH123', 2); // dynamically calculated price propery bc of calculation in default value set
createBooking('LH123', 5);

createBooking('LH123', 1000); // cannot skip an argument
createBooking('LH123', undefined, 1000); // correct way if you want to skip
*/

// Lesson 2 - How passing arguments works: values vs. reference
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
