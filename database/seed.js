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
  menuName: Sequelize.TEXT,
  menuCategoryName: Sequelize.TEXT,
  menuItemName: Sequelize.TEXT,
  menuItemDescription: Sequelize.TEXT,
  menuItemPrice: Sequelize.DECIMAL
})

let menuNames = ['Breakfast', 'Lunch', 'Dinner'];

let menuCategoryNames = ['Appetizers', 'Mains', 'Sides', 'Beverages'];

let getRandomIntInclusive = function(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  //The maximum is inclusive and the minimum is inclusive
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

let getRandomPrice = function() {
  var int = getRandomIntInclusive(1, 25);
  int += .95;
  return int;
};

let capitalizeFirstLetter = function(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

sequelize
.sync({
  force: true
})
.then(function() {
  for (let i = 1; i <= 200; i++) {
    for (let j = 0; j < menuNames.length; j++) {
      for (let k = 0; k < menuCategoryNames.length; k++) {
        for (let l = 1; l <= getRandomIntInclusive(5,10); l++) {
          RestaurantMenuItems.create({
            restaurantId: i,
            menuName: menuNames[j],
            menuCategoryName: menuCategoryNames[k],
            menuItemName: capitalizeFirstLetter(faker.lorem.words()),
            menuItemDescription: faker.lorem.sentence().toLowerCase(),
            menuItemPrice: getRandomPrice()
          })
        }
      }
    }
  }
})

//attempt to make relational schemas

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