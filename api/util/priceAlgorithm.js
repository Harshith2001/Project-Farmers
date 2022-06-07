import productModel from "../models/productModel.js";
class priceAlgorithm {
  constructor(cropName, demand) {
    this.cropName = cropName;
    this.demand = demand;
  }

  async priceCalculator() {
    //supply object
    var supply = {};

    var product = {};

    await productModel.find({ cropName: this.cropName }).then((data) => {
      product = data;
    });
    for (let i = 0; i < product.length; i++) {
      if (product[i].price in supply) {
        supply[`${product[i].price}`] += product[i].quantity;
      } else {
        supply[`${product[i].price}`] = product[i].quantity;
      }
    }
    //price array
    const supplyPriceArray = Object.keys(supply);
    const demandPriceArray = Object.keys(this.demand);
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
      let value = this.demand[priceArray[i]];
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
    var price = priceArray[indexArray.indexOf(Math.max(...indexArray))];
    return price;
  }
}

export default priceAlgorithm;
