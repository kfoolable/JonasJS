'use strict';

// const calcAverageHumanAge = function (ages) {
//   const humanAges = ages.map((dogAge) =>
//     dogAge <= 2 ? 2 * dogAge : 16 + dogAge * 4
//   );
//   const lessThan = humanAges.filter((ages) => ages > 18);
//   console.log(lessThan);
//   const averageAge =
//     lessThan.reduce((acc, ages) => acc + ages, 0) / lessThan.length;
//   return averageAge;
// };

// console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));

// Coding challenge 3
// const calcAverageHumanAge = function (ages) {
//   const humanAges = ages.map(
//     (dogAge) =>
//       (dogAge <= 2 ? 2 * dogAge : 16 + dogAge * 4)
//         .filter((age) => age > 18)
//         .reduce((acc, age, arr) => acc + age, 0) / arr.length
//   );
// };

// console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));

const calcAverageHumanAge = function (ages) {
  const humanAges = ages
    .map((dogAge) => (dogAge <= 2 ? 2 * dogAge : 16 + dogAge * 4))
    .filter((age) => age > 18)
    .reduce((acc, age, _, arr) => acc + age / arr.length, 0);

  return humanAges;
};

console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));
