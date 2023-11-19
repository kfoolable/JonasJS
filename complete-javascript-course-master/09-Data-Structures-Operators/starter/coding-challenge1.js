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
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 11.33,
    x: 3.25,
    team2: 6.5,
  },
};

// const players1 = (game.team1 = game.players[0]);
// const players2 = (game.team2 = game.players[1]);

// const [gk, ...fieldPlayers] = [players1];
// console.log(gk);

// 1)
const [players1, players2] = game.players;

// 2)
const [gk, ...fieldPlayers] = players1;

// 3)
const allPlayers = [...players1, ...players2];

// 4)
const players1Final = [...players1, 'Thiago', 'Coutinho', 'Perisic'];

// 5)
const {
  odds: { team1, x: draw, team2 },
} = game;

// 6)
const printGoals = function (...numPlayers) {
  console.log(...numPlayers);
  console.log(`${numPlayers.length} goals were scored`);
};

//printGoals('Davis', 'Muller', 'Lewandowski', 'Kimmich');
printGoals(...game.scored);

// 7)
// const whoWins = game.odds.team1 || game.odds.team2;
// console.log(whoWins);

team1 < team2 && console.log('Team 1 is more likely to win');
team2 < team1 && console.log('Team 2 is more likely to win');
