const Sequelize = require('sequelize');
const faker = require('faker');

const sequelize = new Sequelize('menus', 'Joe', '', {
  host: 'localhost',
  port: 5554,
  dialect: 'postgres',
});

const RestaurantMenuItems = sequelize.define('RestaurantMenuItems', {
  restaurantId: Sequelize.INTEGER,
  menuName: Sequelize.TEXT,
  menuCategoryName: Sequelize.TEXT,
  menuItemName: Sequelize.TEXT,
  menuItemDescription: Sequelize.TEXT,
  menuItemPrice: Sequelize.DECIMAL,
});

// helper functions
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

// creating fake restaurant data
const menuNames = ['Breakfast', 'Lunch', 'Dinner'];

const menuCategoryNames = ['Appetizers', 'Mains', 'Sides', 'Beverages'];

function createRestaurantData() {
  for (let i = 1; i <= 200; i += 1) {
    for (let j = 0; j < menuNames.length; j += 1) {
      for (let k = 0; k < menuCategoryNames.length; k += 1) {
        for (let l = 1; l <= getRandomIntInclusive(5, 10); l += 1) {
          RestaurantMenuItems.create({
            restaurantId: i,
            menuName: menuNames[j],
            menuCategoryName: menuCategoryNames[k],
            menuItemName: capitalizeFirstLetter(faker.lorem.words()),
            menuItemDescription: faker.lorem.sentence().toLowerCase(),
            menuItemPrice: getRandomPrice(),
          });
        }
      }
    }
  }
}

function fetchRestaurantMenuItems(id, cb) {
  RestaurantMenuItems.findAll({
    where: {
      restaurantId: id,
    },
  })
    .then(data => cb(data))
    .catch((err) => {
      throw err;
    });
} 
module.exports = {
  create: createRestaurantData,
  fetch: fetchRestaurantMenuItems,
};
