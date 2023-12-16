'use strict';

// Lecture 1 - Async, AJAX, APIs
// -> Synchronous code
// - most code is synchronous
// - synchronous code is executed line by line
// - each line of code waits for previous line to finish;
// - (thumbs down) long-running operations block code execution

// -> Asynchronous code
// - Async code is executed after a task that runs in the "background" finish;
// - (thumbs up) Async code is non-blocking;
// - Execution doesn't wait for an async task to finish its work;
// - Callback functions alone do NOT make code async!

// -> AJAX Calls
// - Asynchronous JavaScript And XML: Allows us to communicate with remote web servers in an asynchronous way. With AJAX calls, we can request data from web servers dynamically.
// XML - is a data format that used to be widely used to transmit data on the web
// XML - is not that used anymore but the term AJAX has been popularly used so the name stuck
// Instead, the most widely used data format now is JSON

// API
// - Application Programming Interface: Piece of software that can be used by another piece of software, in order to allow applications to talk to each other;
// - There are many types of APIs in web development:
// - DOM API // Geolocation API // Own Class API // "Online API"
// - "Online" API: Application running on a server, that receives requests for data, and sends data back as response;
// - We can build our own web APIs (requires back-end development, e.g. with node.js) or use 3rd-party APIs

// https://countries-api-836d.onrender.com/countries/name --- new API URL

// Lecture 2 - Our First AJAX Call: XMLHttpRequest

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

// const getCountryData = function (country) {
//   const request = new XMLHttpRequest(); // old school way
//   request.open(
//     'GET',
//     `https://countries-api-836d.onrender.com/countries/name/${country}`
//   );
//   request.send();

//   request.addEventListener('load', function () {
//     const [data] = JSON.parse(this.responseText);
//     console.log(data);

//     const html = `
//       <article class="country">
//         <img class="country__img" src="${data.flag}" />
//         <div class="country__data">
//           <h3 class="country__name">${data.name}</h3>
//           <h4 class="country__region">${data.region}</h4>
//           <p class="country__row"><span>👫</span>${(
//             +data.population / 1000000
//           ).toFixed(1)} people</p>
//           <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
//           <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
//         </div>
//       </article>
//   `;
//     countriesContainer.insertAdjacentHTML('beforeend', html);
//     countriesContainer.style.opacity = 1;
//   });
// };

// getCountryData('portugal');
// getCountryData('usa');
// getCountryData('germany');

// Lecture 3 - How the Web Works: Requests and Responses
// Better to rewatch video

// Lecture 4 - Welcome to callback hell
const renderCountry = function (data, className = '') {
  const html = `
      <article class="country ${className}">
        <img class="country__img" src="${data.flag}" />
        <div class="country__data">
          <h3 class="country__name">${data.name}</h3>
          <h4 class="country__region">${data.region}</h4>
          <p class="country__row"><span>👫</span>${(
            +data.population / 1000000
          ).toFixed(1)} people</p>
          <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
          <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
        </div>
      </article>
  `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

const getCountryAndNeighbour = function (country) {
  // AJAX call country 1
  const request = new XMLHttpRequest(); // old school way
  request.open(
    'GET',
    `https://countries-api-836d.onrender.com/countries/name/${country}`
  );
  request.send();

  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);

    // Render country 1
    renderCountry(data);

    // Get neighbour country (2)
    const [neighbour] = data.borders;

    if (!neighbour) return;

    // AJAX call country 2
    const request2 = new XMLHttpRequest(); // old school way
    request2.open(
      'GET',
      `https://countries-api-836d.onrender.com/countries/alpha/${neighbour}`
    );
    request2.send();

    request2.addEventListener('load', function () {
      const data2 = JSON.parse(this.responseText);
      console.log(data2);
      renderCountry(data2, 'neighbour');
    });
  });
};

// getCountryAndNeighbour('usa');

// Callback hell with setTimeout
// setTimeout(() => {
//   console.log('1 second passed');
//   setTimeout(() => {
//     console.log('2 seconds passed');
//     setTimeout(() => {
//       console.log('3 seconds passed');
//       setTimeout(() => {
//         console.log('4 seconds passed');
//       }, 1000);
//     }, 1000);
//   }, 1000);
// }, 1000);

// Lecture 5 - Promises and the Fetch API

// What are Promises?
// - Promise: An object that is used as a placeholder for the future result of an asynchronous operation
// Less formal definition: A container for an asynchronously delivered value
// Less formal: A container for a future value
// - We no longer need to rely on events and callbacks passed into asynchronous functions to handle asynchronous results;
// - Instead of nesting callbacks, we can chain promises for a sequence of asynchronous operations: escaping callback hell (woohoo)

// const request = new XMLHttpRequest();
// request.open(
//   'GET',
//   `https://countries-api-836d.onrender.com/countries/name/${country}`
// );
// request.send();

// const request = fetch(
//   'https://countries-api-836d.onrender.com/countries/name/portugal'
// );
// console.log(request);

// const getCountryData = function (country) {
//   fetch(`https://countries-api-836d.onrender.com/countries/name/${country}`)
//     .then(function (response) {
//       console.log(response);
//       return response.json(); // <- is a method that is  available to every response object coming from the fetch function
//     })
//     .then(function (data) {
//       console.log(data);
//       renderCountry(data[0]);
//     });
// };

// Lecture 6 - Chaining Promises
const getCountryData = function (country) {
  // Country 1
  fetch(`https://countries-api-836d.onrender.com/countries/name/${country}`)
    .then((response) => response.json())
    .then((data) => {
      renderCountry(data[0]);
      const neighbour = data[0].borders?.[0];

      if (!neighbour) return;

      // Country 2
      return fetch(
        `https://countries-api-836d.onrender.com/countries/alpha/${neighbour}`
      );
    })
    .then((response) => response.json())
    .then((data) => renderCountry(data, 'neighbour'));
};

// getCountryData('portugal');
getCountryData('germany');
