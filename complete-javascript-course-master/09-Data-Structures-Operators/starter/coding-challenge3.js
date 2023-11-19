'use-strict';

const gameEvents = new Map([
  [17, '⚽ GOAL'],
  [36, '🔁 Substitution'],
  [47, '⚽ GOAL'],
  [61, '🔁 Substitution'],
  [64, '🔶 Yellow card'],
  [69, '🔴 Red card'],
  [70, '🔁 Substitution'],
  [72, '🔁 Substitution'],
  [76, '⚽ GOAL'],
  [80, '⚽ GOAL'],
  [92, '🔶 Yellow card'],
]);

// 1.
// My solution
const events = [...new Set(gameEvents.values())];
console.log(events);

// Correct

// 2.
// My solution
gameEvents.delete(64);
console.log(gameEvents);

// Correct

// 3.
// My solution
// const minutes = [...gameEvents.keys()];
// console.log(minutes);

// const eventDifferences = [];

// for (let i = 1; i < minutes.length; i++) {
//   const differences = minutes[i] - minutes[i - 1];
//   eventDifferences.push(differences);
// }

// let sumOfDifferences = 0;

// for (let i = 0; i < eventDifferences.length; i++) {
//   sumOfDifferences += eventDifferences[i];
// }

// const avgMinutes = sumOfDifferences / minutes.length;
// console.log(avgMinutes);

// Jonas solution lmaoo
const time = [...gameEvents.keys()].pop();
console.log(
  `An event happened, on average, every ${time / gameEvents.size} minutes`
);
console.log(time);

// 4.
// Jonas
for (const [min, event] of gameEvents) {
  const half = min <= 45 ? 'FIRST' : 'SECOND';
  console.log(`[ ${half} HALF ] ${min}: ${event}`);
}
