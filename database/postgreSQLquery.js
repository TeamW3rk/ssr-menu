const Sequelize = require('sequelize');

const sequelize = new Sequelize('test', 'postgres', 'postgres', {
  host: 'localhost',
  // uncomment port if using Postgres.app
  port: 5432,
  dialect: 'postgres',
  logging: false,
});

const RestaurantMenuItems = sequelize.define('RestaurantMenuItems', {
  restaurantId: Sequelize.INTEGER,
  menuName: Sequelize.TEXT,
  menuCategoryName: Sequelize.TEXT,
  menuItemName: Sequelize.TEXT,
  menuItemDescription: Sequelize.TEXT,
  menuItemPrice: Sequelize.DECIMAL,
});

let time = new Date().getTime();

RestaurantMenuItems.findOne({
  where: {
    restaurantId: 10049,
  },
}).then((results) => {
  console.log(results);
  console.log('queried in ', (new Date().getTime() - time) / 1000, 's');
});

