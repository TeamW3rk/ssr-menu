const Sequelize = require("sequelize");
const faker = require("faker");
const Promise = require("bluebird");
const sequelize = new Sequelize("menus", "Joe", "", {
  host: "localhost",
  port: 5554,
  dialect: "postgres"
});

const RestaurantMenuItems = sequelize.define("RestaurantMenuItems", {
  restaurantId: Sequelize.INTEGER,
  menuCategoryName: Sequelize.TEXT,
  menuItemName: Sequelize.TEXT,
  menuItemDescription: Sequelize.TEXT,
  menuItemPrice: Sequelize.DECIMAL
})

let menus = ['Breakfast', 'Lunch', 'Dinner'];

let getRandomIntInclusive = function(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
};

let getRandomPrice = function() {
  var int = getRandomIntInclusive(1, 25);
  int += .95;
  return int;
};

sequelize
.sync({
  force: true
})
.then(function() {
  for (var i = 1; i <= 200; i++) {
    for (var j = 0; j < menus.length; j++) {
      for (var k = 1; k < 10; k++) {
        RestaurantMenuItems.create({
          restaurantId: i,
          menuCategoryName: menus[j],
          menuItemName: faker.lorem.word(),
          menuItemDescription: faker.lorem.sentence(),
          menuItemPrice: getRandomPrice()
        })
      }
    }
  }
})

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
// RestaurantMenu.hasMany(MenuCategories, { foreignKey: "menuId" });
// MenuCategories.belongsTo(RestaurantMenu, { foreignKey: "menuId" });

// // //one to many
// MenuCategories.hasMany(MenuItems, { foreignKey: "categoryId" });
// MenuItems.belongsTo(MenuCategories, { foreignKey: "categoryId" });

// for (var i = 0; i < 5; i++) {
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