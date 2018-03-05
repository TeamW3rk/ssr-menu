const Sequelize = require('sequelize');
const faker = require('faker');
const helper = require('./helper');

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

const menuNames = ['Breakfast', 'Lunch', 'Dinner'];

const menuCategoryNames = ['Appetizers', 'Mains', 'Sides', 'Beverages'];


sequelize
  .sync({
    force: true,
  })
  .then(() => {
    for (let i = 1; i <= 200; i += 1) {
      for (let j = 0; j < menuNames.length; j += 1) {
        for (let k = 0; k < menuCategoryNames.length; k += 1) {
          for (let l = 1; l <= helper.randomInt(5, 10); l += 1) {
            RestaurantMenuItems.create({
              restaurantId: i,
              menuName: menuNames[j],
              menuCategoryName: menuCategoryNames[k],
              menuItemName: helper.capFirstLet(faker.lorem.words()),
              menuItemDescription: faker.lorem.sentence().toLowerCase(),
              menuItemPrice: helper.randomPrice(),
            });
          }
        }
      }
    }
  });

// module.exports = {
// };

// attempt to make relational schemas

// const RestaurantMenu = sequelize.define("RestaurantMenu", {
//   menuName: Sequelize.TEXT,
//   menuDescription: Sequelize.TEXT,
//   restaurantId: Sequelize.INTEGER
// });

// const MenuCategories = sequelize.define("MenuCategories", {
//   categoryName: Sequelize.TEXT,
//   categoryDescription: Sequelize.TEXT,
//   menuId: Sequelize.INTEGER
// });

// const MenuItems = sequelize.define("MenuItems", {
//   itemName: Sequelize.TEXT,
//   itemDescription: Sequelize.TEXT,
//   itemPrice: Sequelize.DECIMAL,
//   categoryId: Sequelize.INTEGER
// });

// //one to many
// RestaurantMenu.hasMany(MenuCategories, { foreignKey: "menuId", sourceKey: "id"});
// MenuCategories.belongsTo(RestaurantMenu, { foreignKey: "menuId", targetKey: "id" });

// //one to many
// MenuCategories.hasMany(MenuItems, { foreignKey: "categoryId", sourceKey: "id" });
// MenuItems.belongsTo(MenuCategories, { foreignKey: "categoryId" });

// for (var i = 1; i < 201; i++) {
//   for (var j = 0; j < 3; j++) {
//     RestaurantMenu.create({
//       menuName: menus[j],
//       menuDescription: faker.lorem.sentence(),
//       restaurantId: i
//     });
//   }
// }
// for (var x = 1; x < 16; x++) {
//   for (var y = 0; y < getRandomIntInclusive(3, 6); y++) {
//     MenuCategories.create({
//       categoryName: faker.lorem.words(),
//       categoryDescription: faker.lorem.sentence(),
//       menuId: x
//     })
//   }
// }
// for (var m = 0; m < 75; m++) {
//   for (var n = 0; n < getRandomIntInclusive(5, 8); n++) {
//     MenuItems.create({
//       itemName: faker.lorem.word(),
//       itemDescription: faker.lorem.sentence(),
//       itemPrice: getRandomPrice(),
//       categoryId: m
//     })
//   }
// }
