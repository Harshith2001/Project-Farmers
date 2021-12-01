// Initialize these arrays from respective files.
var slopeArray, constantArray, pqArray, ppArray;
var solver = (pqArray) => {
  var newSlope, newConstant, newPrice, newQuantity;
  // Write a conditonal statement to check if the slope is infinity and 0.
  // write a conditional statment to execute only for even number array length.
  // quantity factor should be cconsidered at Tons.
  const losa = slopeArray.length;

  newSlope =
    (pqArray[n].price - pqArray[n - 1].price) /
    (pqArray[n].quantity - pqArray[n - 1].quantity);
  newConstant = pqArray[n].price - newSlope * pqArray[n].quantity;
  newSlope = (losa * slopeArray[losa] + newSlope) / (losa + 1);
  newConstant = (losa * constantArray[losa] + newConstant) / (losa + 1);

  slopeArray.push(newSlope);
  constantArray.push(newConstant);

  newPrice = newSlope * newQuantity + newConstant;
  newPrice = newPrice / newQuantity;
  newPrice = (losa * ppArray[losa] + newPrice) / (losa + 1);

  ppArray.push(newPrice);
};
