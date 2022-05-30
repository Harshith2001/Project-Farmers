//supply object
var supply = {};
//demand object
var demand = {};

var maxWeight = -1;

//price array
const supplyPriceArray = Object.keys(supply);
const demandPriceArray = Object.keys(demand);
var priceArray = [
  ...new Set(
    supplyPriceArray
      .concat(demandPriceArray)
      .map((i) => Number(i))
      .sort((a, b) => a - b)
  ),
];
var supplyArray = [];
for (let i = 0; i < priceArray.length; i++) {
  let value = supply[priceArray[i]];
  if (value !== undefined) {
    supplyArray.push(value);
  } else {
    supplyArray.push(0);
  }
}
var demandArray = [];
for (let i = 0; i < priceArray.length; i++) {
  let value = demand[priceArray[i]];
  if (value !== undefined) {
    demandArray.push(value);
  } else {
    demandArray.push(0);
  }
}
for (let i = priceArray.length - 2; i >= 0; i--) {
  demandArray[i] += demandArray[i + 1];
}
for (let i = 1; i < priceArray.length; i++) {
  supplyArray[i] += supplyArray[i - 1];
}
var indexArray = [];
for (let i = 0; i < priceArray.length; i++) {
  indexArray.push(Math.min(supplyArray[i], demandArray[i]));
}
console.log(priceArray[indexArray.indexOf(Math.max(indexArray))]);
