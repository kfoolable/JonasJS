'use strict';

const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

// 1.
// my solution
const createRecFoodPortions = function (obj) {
  obj.forEach(function (food) {
    food.recommendedFood = Math.trunc(food.weight ** 0.75 * 28);
  });
};

// jones soluton
dogs.forEach(
  (food) => (food.recommendedFood = Math.trunc(food.weight ** 0.75 * 28))
);
console.log(dogs);

// 2.
// my solution
const sarahsDog = function (dogs) {
  const sarahsDog = dogs.find((dog) => dog.owners.includes('Sarah'));

  if (sarahsDog.curFood > sarahsDog.recommendedFood) {
    console.log(
      `Sarah's dog is eating too much!\nThe recomended food intake is: ${sarahsDog.recommendedFood}g.\nHe is eating ${sarahsDog.curFood}g.`
    );
  } else if (sarahsDog.curFood < sarahsDog.recommendedFood) {
    console.log(
      `Sarah's dog is eating too little!\nThe recomended food intake is: ${sarahsDog.recommendedFood}g.\nHe is eating ${sarahsDog.curFood}g.`
    );
  } else {
    console.log(`Sarah's dog is eating just right! ;)`);
  }
};

// jonas solution
const sarahsDog1 = dogs.find((dog) => dog.owners.includes('Sarah'));
console.log(
  `Sarah's dog is eating too ${sarahsDog1.curFood ? 'much' : 'little'}!`
);

// 3.
// my solution
const ownersEatTooMuch = dogs
  .filter((dogs) => dogs.curFood > dogs.recommendedFood)
  .flatMap((owners) => owners.owners);

console.log(ownersEatTooMuch);

const ownersEatTooLittle = dogs
  .filter((dogs) => dogs.curFood < dogs.recommendedFood)
  .flatMap((owners) => owners.owners);

console.log(ownersEatTooLittle);

// 4.
// my solution
const ownersEatTooMuchStr = `${ownersEatTooMuch.join(
  ' and '
)}'s dogs eat too much!`;

console.log(ownersEatTooMuchStr);

const ownersEatTooLittleStr = `${ownersEatTooLittle.join(
  ' and '
)}'s dogs eat too little!`;
console.log(ownersEatTooLittleStr);

// 5.
// my solution
const exactAmount = dogs.some((dog) => dog.curFood === dog.recommendedFood);
console.log(exactAmount);

// 6.
// my solution
const okayAmount = (dog) =>
  dog.curFood > dog.recommendedFood * 0.9 &&
  dog.curFood < dog.recommendedFood * 1.1;

console.log(dogs.some(okayAmount));

// 7.
// my solution
const okayAmountArr = dogs.filter(okayAmount);
console.log(okayAmountArr);

// 8.
// my solution
const ascendingFoodRec = dogs
  .sort((a, b) => a - b)
  .flatMap((food) => food.recommendedFood);
console.log(ascendingFoodRec);

// jonas solution
const dogsCopy = dogs
  .slice()
  .sort((a, b) => a.recommendedFood - b.recommendedFood);
console.log(dogsCopy);
