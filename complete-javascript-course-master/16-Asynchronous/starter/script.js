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

const renderErr = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  countriesContainer.style.opacity = 1;
};

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
// Better to rewatch video if you're really interested

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

// Old-school way
// const request = new XMLHttpRequest();
// request.open(
//   'GET',
//   `https://countries-api-836d.onrender.com/countries/name/${country}`
// );
// request.send();

// New style way
// const request = fetch(
//   'https://countries-api-836d.onrender.com/countries/name/portugal'
// );
// console.log(request);

// const getCountryData = function (country) {
//   fetch(`https://countries-api-836d.onrender.com/countries/name/${country}`)
//     .then(function (response) { // <- then method is called once a promise is resolved <- how a fulfilled promise is handled
//       console.log(response);
//       return response.json(); // <- then is a method that is  available to every response object coming from the fetch method
//     })
//     .then(function (data) {
//       console.log(data);
//       renderCountry(data[0]);
//     });
// };

// Lecture 6 - Chaining Promises

// Previous version, newer version is up
// const getCountryData = function (country) {
//   // Country 1
//   fetch(`https://countries-api-836d.onrender.com/countries/name/${country}`)
//     .then((response) => {
//       console.log(response);

//       if (!response.ok)
//         throw new Error(`Country not found: ${response.status}`);

//       return response.json();
//       // (err) => alert(err) // handling errors
//     }) // reads the ReadableStream object in the body property of the fetch data
//     .then((data) => {
//       renderCountry(data[0]);
//       // const neighbour = data[0].borders?.[0];
//       const neighbour = 'dasfsdadf';
//       // console.log(data);

//       if (!neighbour) return;

//       // return 23;
//       // Country 2
//       return fetch(
//         `https://countries-api-836d.onrender.com/countries/alpha/${neighbour}`
//       );
//     })
//     .then((response) => {
//       if (!response.ok)
//         throw new Error(`Country not found: ${response.status}`);

//       return response.json();
//     })
//     .then((data) => renderCountry(data, 'neighbour'))
//     .catch((err) => {
//       // catch method is called when a promise is rejected
//       console.error(err); // better way of handling errors in all of the chains
//       renderErr(`Something went wrong: ${err.message}. Try again!`);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     }); // finally method is a method that happens no matter what in promises, regardless whether a promise is fulfilled or rejected
// };

// getCountryData('dasdfasdf');

const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then((response) => {
    if (!response.ok) throw new Error(`${errorMsg}: ${response.status}`);

    return response.json();
  });
};

const getCountryData = function (country) {
  // Country 1
  getJSON(
    `https://countries-api-836d.onrender.com/countries/name/${country}`,
    'Country not found'
  )
    .then((data) => {
      renderCountry(data[0]);
      const neighbour = data[0].borders?.[0];
      // const neighbour = 'dasfsdadf';
      // console.log(data);

      if (!neighbour) throw new Error(`No neighbour found!`);

      // Country 2
      return getJSON(
        `https://countries-api-836d.onrender.com/countries/alpha/${neighbour}`,
        'Country not found'
      );
    })
    .then((data) => renderCountry(data, 'neighbour'))
    .catch((err) => {
      console.error(err);
      renderErr(`Something went wrong: ${err.message}. Try again!`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

btn.addEventListener('click', function () {
  // getCountryData('portugal');
  getCountryData('australia');
});

// Lesson 7 - Handling Rejected Promises - code changes above, see notes for reference - catch, finally methods

// Lesson 8 - Throwing Errors Manually aka Custom Error messages - code changes above

// Lesson 9 - Asynchronous Behind the Scenes: The Event Loop - lecture part, best to watch video
