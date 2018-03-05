const helper = require('../database/helper.js');

test('should get a random integer between 1 and 25', () => {
  const number = helper.randomInt(1, 25);
  expect(true).toBe(typeof number === 'number' && number >= 1 && number <= 25);
});

test('should get a random price between 1.95 and 25.95', () => {
  const price = helper.randomPrice();
  expect(true).toBe(price >= 1.95 && price <= 25.95);
});

test('should capitalize the first letter of a string', () => {
  const string = helper.capFirstLet('hello');
  expect(string).toBe('Hello');
});

