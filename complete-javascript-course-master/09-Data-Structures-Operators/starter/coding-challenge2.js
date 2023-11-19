'use-strict';

const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels', 'Neuer'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

// 1.
// My solution
const goalies = Object.entries(game.scored);

for (const [index, player] of goalies) {
  console.log(`Goal ${Number(index) + 1}: ${player}`);
}

// Jonas solution
for (const [i, player] of game.scored.entries())
  console.log(`Goal ${i + 1}: ${player}`);

// 2.
// My solution
const averageOdd = Object.values(game.odds);
//const averageOdd = Object.entries(game.odds);

let count = 0;
let sum = 0;

for (const odd of averageOdd) {
  sum += odd;
  count++;
}

const avg = sum / count;
console.log(`Average of odds: ${avg}`);

// Jonas solution
const odds = Object.values(game.odds);
let average = 0;
for (const odd of odds) average += odd;
average /= odds.length;
console.log(average);

// 3.
// My solution
// const printOdds = Object.entries(game.odds);

// for (const [key, value] of printOdds) {
//   if (key === 'x') {
//     console.log(`Odd of draw: ${value}`);
//   } else {
//     const teamName = game[key];
//     console.log(`Odd of victory ${teamName}: ${value}`);
//   }
// }

// Jonas solution
for (const [team, odd] of Object.entries(game.odds)) {
  const teamStr = team === 'x' ? 'draw' : `victory ${game[team]}`;
  console.log(`Odd of ${teamStr} ${odd}`);
}

// 4. BONUS
const scorers = {};

// for (const scorer of game.scored) {
//   if (scorers[scorer]) {
//     scorers[scorer] += 1;
//   } else {
//     scorers[scorer] = 1;
//   }
// }

// Alternate using ternary operator
for (const scorer of game.scored) {
  scorers[scorer] ? (scorers[scorer] += 1) : (scorers[scorer] = 1);
}

console.log(scorers);
