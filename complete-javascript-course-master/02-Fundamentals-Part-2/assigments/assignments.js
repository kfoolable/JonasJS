"use strict";

function describeCountry(country, population, capitalCity) {
  const myCountry = `${country} has ${population} million people and its capital city is ${capitalCity}`;
  return myCountry;
}

const philippines = describeCountry("Philippines", 117, "Manila");
const india = describeCountry("India", 999, "New Delhi");
const germany = describeCountry("Germany", 83.2, "Berlin");

console.log(philippines);
console.log(india);
console.log(germany);

function percentageOfWorld1(population) {
  return (population / 7900) * 100;
}

const ireland = percentageOfWorld1(5033);
const australia = percentageOfWorld1(2569);
const brazil = percentageOfWorld1(2143);

console.log(ireland, australia, brazil);

const percentageOfWorld2 = function (population) {
  return (population / 7900) * 100;
};

const worldPercentage1 = percentageOfWorld2(9000);
const worldPercentage2 = percentageOfWorld2(9000);
const worldPercentage3 = percentageOfWorld2(9000);

console.log(worldPercentage1, worldPercentage2, worldPercentage3);

const percentageOfWorld3 = (population) => (population / 7900) * 100;

console.log(percentageOfWorld3(9800));

function describePopulation(country, population) {
  const percentagePopulation = percentageOfWorld1(population);
  return `${country} has ${population} million people, which is about %${percentagePopulation} of the world`;
}

console.log(describePopulation("Philippines", 1178));
console.log(describePopulation("Germany", 255));
console.log(describePopulation("Argentina", 1009));

const populations = [1990, 1116, 2555, 3412];

console.log(populations.length === 4);

const percentages = [
  percentageOfWorld1(populations[0]),
  percentageOfWorld1(populations[1]),
  percentageOfWorld1(populations[2]),
  percentageOfWorld1(populations[populations.length - 1]),
];

console.log(percentages);

const neighbours = ["France", "Vienna", "London"];

neighbours.push("Utopia");
neighbours.pop();

if (!neighbours.includes("Germany")) {
  console.log("Probably not a central European country :D");
}

neighbours[neighbours.indexOf("Vienna")] = "Republic of Vienna";
console.log(neighbours);

const myCountry = {
  country: "Philippines",
  capital: "Manila",
  language: "Tagalog",
  population: 117,
  neighbours: ["Japan", "China", "Australia"],

  describe: function () {
    return `${this.country} has ${this.population} million ${this.language}-speaking people, ${this.neighbours.length} neighbouring countries and a capital called ${this.capital}.`;
  },

  checkIsland: function () {
    return (this.isIsland = this.neighbours.length === 0 ? true : false);
  },
};

console.log(
  `${myCountry.country} has ${myCountry.population} million ${myCountry.language}-speaking people, ${myCountry.neighbours.length} neighbouring countries and a capital called ${myCountry.capital}.`
);

myCountry.population += 2;
console.log(myCountry.population);

myCountry["population"] += 2;
console.log(myCountry["population"]);

console.log(myCountry.describe());
console.log(myCountry.checkIsland());

// for (let v = 1; v <= 50; v++) {
//   console.log(`Voter number ${v} is currently voting`);
// }

// const populations = [1990, 1116, 2555, 3412];

const percentages2 = [];

for (let i = 0; i < populations.length; i++) {
  percentages2[i] = percentageOfWorld1(populations[i]);
  console.log(percentages2[i]);
}

console.log(percentages);
console.log(percentages2);

console.log(" ---- LOOPS LOOPS ARRAYS ----");

const listOfNeighbours = [
  ["Canada", "Mexico"],
  ["Spain"],
  ["Norway", "Sweden", "Russia"],
];

for (let i = 0; i < listOfNeighbours.length; i++) {
  for (let j = 0; j < listOfNeighbours[i].length; j++) {
    //if (listOfNeighbours[j].length > 1) continue;
    console.log(`Neighbour: ${listOfNeighbours[i][j]}`);
  }
}

const percentages3 = [];

let i = 0;
while (i < populations.length) {
  percentages3[i] = percentageOfWorld1(populations[i]);
  //console.log(percentages3);
  i++;
}

console.log(percentages3);
