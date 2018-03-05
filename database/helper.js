
function getRandomIntInclusive(from, to) {
  const min = Math.ceil(from);
  const max = Math.floor(to);
  // The maximum is inclusive and the minimum is inclusive
  return Math.floor(Math.random() * ((max - min) + 1)) + min;
}

function getRandomPrice() {
  let int = getRandomIntInclusive(1, 25);
  int += 0.95;
  return int;
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

module.exports = {
  randomInt: getRandomIntInclusive,
  randomPrice: getRandomPrice,
  capFirstLet: capitalizeFirstLetter,
};
