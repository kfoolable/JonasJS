// Remember, we're gonna use strict mode in all scripts now!
'use strict';

// const x = 23;
// if (x === 23) console.log(23);

// const calcAge = (birthYear) => 2037 - birthYear;

// console.log(calcAge(1991));

// const measureKelvin = function () {
//   const measurement = {
//     type: 'temp',
//     unit: 'celsius',

//     // FIX bug
//     value: Number(prompt('Degrees celsius: ')),
//   };

//   //console.table(measurement);
//   //console.log(measurement.value);
//   const kelvin = measurement.value + 273;
//   return kelvin;
// };

// // A) identify the bug
// console.log(measureKelvin());

// CODING CHALLENGE - My solution
// function printForecast(arr) {
//   for (let i = 0; i < arr.length; i++) {
//     console.log(`${arr[i]}C in ${i + 1} days`);
//   }
// }

// printForecast([17, 21, 23]);
// printForecast([12, 5, -5, 0, 4]);

// CODING CHALLENGE - Right solution
function printForecast(arr) {
  let degrees = '';
  for (let i = 0; i < arr.length; i++) {
    degrees += `${arr[i]}C in ${i + 1} days ... `;
  }
  console.log(`... ${degrees}`);
}

printForecast([17, 21, 23]);

// const measureKelvin = function () {
//   const measurement = {
//     type: 'temp',
//     unit: 'celsius',
//     value: Number(prompt('Degrees celcius: ')),
//   };

//   const kelvin = measurement.value + 273;
//   return kelvin;
// };

// // A) Identify the bug
// console.log(measureKelvin());

// const calcTempAmplitudeBug = function (t1, t2) {
//   const temps = t1.concat(t2);
//   console.log(temps);

//   let max = 0;
//   let min = 0;

//   for (let i = 0; i < temps.length; i++) {
//     const curTemp = temps[i];
//     if (typeof curTemp !== 'number') continue;

//     if (curTemp > max) max = curTemp;
//     if (curTemp < min) min = curTemp;
//   }

//   console.log(max, min);
//   return max - min;
// };

// const amplitudeBug = calcTempAmplitudeBug([3, 5, 1], [9, 4, 5]);
// console.log(amplitudeBug);
