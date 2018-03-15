const Sequelize = require('sequelize');
const helper = require('./helper');
const faker = require('faker');

// const user = 'Joe';

const sequelize = new Sequelize('menus', 'postgres', 'postgres', {
  host: 'localhost',
  // uncomment port if using Postgres.app
  port: 5432,
  dialect: 'postgres',
});

const menuNames = ['Breakfast', 'Lunch', 'Dinner'];

const menuCategoryNames = ['Appetizers', 'Mains', 'Sides', 'Beverages'];

const RestaurantMenuItems = sequelize.define('RestaurantMenuItems', {
  restaurantId: Sequelize.INTEGER,
  menuName: Sequelize.TEXT,
  menuCategoryName: Sequelize.TEXT,
  menuItemName: Sequelize.TEXT,
  menuItemDescription: Sequelize.TEXT,
  menuItemPrice: Sequelize.DECIMAL,
});

// creates restaurant data

const pushableArray = [];

function createRestaurantData(start, end) {
// 1041
  for (let i = start; i <= end; i += 1) {
    for (let j = 0; j < menuNames.length; j += 1) {
      for (let k = 0; k < menuCategoryNames.length; k += 1) {
        for (let l = 1; l <= 9; l += 1) {
          const obj = {};
          // RestaurantMenuItems.create({
          //   restaurantId: i,
          //   menuName: menuNames[j],
          //   menuCategoryName: menuCategoryNames[k],
          //   menuItemName: helper.capFirstLet(faker.lorem.words()),
          //   menuItemDescription: faker.lorem.sentence().toLowerCase(),
          //   menuItemPrice: helper.randomPrice(),
          obj.restaurantId = i;
          obj.menuName = menuNames[j];
          obj.menuCategoryName = menuCategoryNames[k];
          obj.menuItemName = helper.capFirstLet(faker.lorem.words());
          obj.menuItemDescription = faker.lorem.sentence().toLowerCase();
          obj.menuItemName = helper.capFirstLet(faker.lorem.words());
          obj.menuItemPrice = helper.randomPrice();
          pushableArray.push(obj);
        }
      }
    }
  }
}


// overwrites current data and stores new
sequelize
  .sync({
    force: false,
  })
  .then(() => {
    // createRestaurantData();
    async function asyncCall() {
      let start = 1;
      let end = 1041;

      while (end < 10000) {
        await createRestaurantData(start, end);
        start += end;
        end += 1041;
      }
    }
    asyncCall();
  });

// module.exports.create = createRestaurantData;

