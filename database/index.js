const Sequelize = require('sequelize');
const helper = require('./helper');
const faker = require('faker');
const Promise = require('bluebird');
const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

const time = new Date().getTime();

const sequelize = new Sequelize('test', 'postgres', 'postgres', {
  host: 'localhost',
  port: 5432,
  dialect: 'postgres',
  logging: false,
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

const seedDB = function () {
  const id = cluster.worker.id;

  sequelize
    .sync({
      force: false,
    })
    .then(() => {
      async function recurse(first, second) {
        if (second < ((104000 / numCPUs) * id) + 1) {
          try {
            await createRestaurantData(first, second);
          } catch (error) {
            console.error(error);
          }
          recurse(first + 1000, second + 1000);
        }
      }

      recurse((id - 1) * (104000 / numCPUs) + 1, ((id - 1) * (104000 / numCPUs) + 1) + 1000);
    });
};

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log('done in ', (new Date().getTime() - time) / 1000, 's :3 ^_^ <3 <(^_^<)');
    console.log(`worker ${worker.process.pid} finished`);
  });
} else {
  seedDB();
  console.log(`Worker ${process.pid} started`);
}

function createRestaurantData(start, end) {
  const array = [];

  for (let i = start; i <= end; i += 1) { 
    for (let j = 0; j < menuNames.length; j += 1) {
      for (let k = 0; k < menuCategoryNames.length; k += 1) {
        for (let l = 1; l <= 9; l += 1) {
          const obj = {};
          obj.restaurantId = i;
          obj.menuName = menuNames[j];
          obj.menuCategoryName = menuCategoryNames[k];
          obj.menuItemName = helper.capFirstLet(faker.lorem.words());
          obj.menuItemDescription = faker.lorem.sentence().toLowerCase();
          obj.menuItemName = helper.capFirstLet(faker.lorem.words());
          obj.menuItemPrice = helper.randomPrice();
          array.push(obj);
        }
      }
    }
  }
  return RestaurantMenuItems.bulkCreate(array);
}

module.exports.RestaurantMenuItems = RestaurantMenuItems;

