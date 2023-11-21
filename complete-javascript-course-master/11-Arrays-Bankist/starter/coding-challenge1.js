'use-strict';

const julesData1 = [3, 5, 2, 12, 7];
const julesData2 = [9, 16, 6, 8, 3];
const katesData1 = [4, 1, 15, 8, 3];
const katesData2 = [10, 5, 6, 1, 4];

const checkDogs = function (dogsJulia, dogsKate) {
  const dogsJuliaCorrected = dogsJulia.slice();
  dogsJuliaCorrected.splice(0, 1); // removes the first element
  dogsJuliaCorrected.splice(-2); // removes the two elements from the end
  //   console.log(dogsJuliaCorrected);
  const dogs = dogsJuliaCorrected.concat(dogsKate);

  dogs.forEach(function (dog, i) {
    const adultOrPup = dog >= 3 ? 'is an adult' : 'is still a puppy';

    console.log(`Dog number ${i + 1} ${adultOrPup}, and is ${dog} years old`);
  });
};

checkDogs([...julesData1, ...julesData2], [...katesData1, ...katesData2]);
