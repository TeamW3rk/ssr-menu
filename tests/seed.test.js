const seed = require('../database/helper.js');

test('gets a random int from helper function', () => {
  const number = seed.randomInt(1, 25);
  expect(true).toBe(number > 0 && number < 26);
});
