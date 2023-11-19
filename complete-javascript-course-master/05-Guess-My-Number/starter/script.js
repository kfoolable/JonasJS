'use strict';

// console.log(document.querySelector('.message').textContent);
// document.querySelector('.message').textContent = 'Correct Number';

// document.querySelector('.number').textContent = 13;
// document.querySelector('.score').textContent = 10;

// document.querySelector('.guess').value = 23;
// console.log(document.querySelector('.guess').value);

let number = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highScore = 0;

// Another refactoring technique is by using functions
const displayMessage = function (message) {
  document.querySelector('.message').textContent = message;
};

document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);
  console.log(guess);

  if (!guess) {
    // document.querySelector('.message').textContent = 'No Number!';
    displayMessage('No Number!');
  } else if (guess === number) {
    // document.querySelector('.message').textContent = 'Correct Number!';
    displayMessage('Correct Number!');
    document.querySelector('.number').textContent = number;

    document.querySelector('body').style.backgroundColor = '#60b347';
    document.querySelector('.number').style.width = '30rem';

    if (score > highScore) {
      highScore = score;
      document.querySelector('.highscore').textContent = highScore;
    }
  } else if (guess !== number) {
    // Refactoring technique = making the code shorter
    // Technique to avoid repition in code
    if (score > 1) {
      //   document.querySelector('.message').textContent =
      //     guess > number ? 'Too high!' : 'Too low!';
      displayMessage(guess > number ? 'Too high!' : 'Too low!');
      score--;
      document.querySelector('.score').textContent = score;
    } else {
      //   document.querySelector('.message').textContent = 'You lost the game!';
      displayMessage('You lost the game!');
      document.querySelector('.score').textContent = 0;
    }

    //   } else if (guess > number) {
    //     if (score > 1) {
    //       document.querySelector('.message').textContent = 'Too high!';
    //       score--;
    //       document.querySelector('.score').textContent = score;
    //     } else {
    //       document.querySelector('.message').textContent = 'You lost the game!';
    //       document.querySelector('.score').textContent = 0;
    //     }
    //   } else if (guess < number) {
    //     if (score > 1) {
    //       document.querySelector('.message').textContent = 'Too low!';
    //       score--;
    //       document.querySelector('.score').textContent = score;
    //     } else {
    //       document.querySelector('.message').textContent = 'You lost the game!';
    //       document.querySelector('.score').textContent = 0;
    //     }
  }
});

document.querySelector('.again').addEventListener('click', () => {
  score = 20;
  number = Math.trunc(Math.random() * 20) + 1;

  //   document.querySelector('.message').textContent = 'Start guessing...';
  displayMessage('Start guessing...');
  document.querySelector('.score').textContent = score;
  document.querySelector('.number').textContent = '?';
  document.querySelector('.guess').value = '';

  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';
});
