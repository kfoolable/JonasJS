console.log("assignments.js file");

const country = "Philippines";
const continent = "Asia";
let population = 117337368;

let populationByHalf = population / 2;
population += 1;

const finlandPopulation = 6000000;

// console.log(country);
// console.log(continent);
// console.log(population);

const isIsland = true;
const language = "Tagalog";
const description = `Portugal is in Europe, and its 11 million people speak Portugese`;

if (population > 33000000) {
  console.log(`Portugal's population is above average`);
} else {
  console.log(`Portugal's population is 22 million below average`);
}

console.log(typeof isIsland);
console.log("Population by half: " + populationByHalf);
console.log(population > finlandPopulation);
console.log(population < 33000000);
console.log(typeof country);
console.log(typeof language);

console.log("9" - "5");
console.log("19" - "13" + "17");
console.log("19" - "13" + 17);
console.log("123" < 53);
console.log(5 + 6 + "4" + 9 - 4 - 2); //1143

// const numNeighbours = Number(
//   prompt("How many neighbours does your country have?")
// );

// if (numNeighbours === 1) {
//   console.log("Only 1 border!");
// } else if (numNeighbours > 1) {
//   console.log("More than 1 border!");
// } else {
//   console.log("No borders");
// }

switch (language) {
  case "chinese":
  case "mandarin":
    console.log("MOST number of native speakers!");
    break;
  case "spanish":
    console.log("2nd place in number of native speakers");
    break;
  case "english":
    console.log("3rd place");
    break;
  case "hindi":
    console.log("Number 4");
    break;
  case "arabic":
    console.log("5th most spoken language");
    break;
  default:
    console.log("Great language too :D");
}

population > 33000000
  ? console.log(`Portugal's population is above average`)
  : console.log(`Portugal's population is below average`);
