function getMinMax(str) {
  let numbers = str
    .split(' ')
    .map(elem => parseFloat(elem))
    .filter(num => !isNaN(num));

  const min = Math.min(...numbers);
  const max = Math.max(...numbers);

  return {min, max};
}