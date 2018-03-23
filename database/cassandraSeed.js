const cassandra = require('cassandra-driver');
const async = require('async');
const helper = require('./helper');
const faker = require('faker');
const numCPUs = require('os').cpus().length;
const cluster = require('cluster');

const client = new cassandra.Client({ contactPoints: ['127.0.0.1'] });

const menuNames = ['Breakfast', 'Lunch', 'Dinner'];

const menuCategoryNames = ['Appetizers', 'Mains', 'Sides', 'Beverages'];

// client.connect()
//   .then(() => {
//     const query = 'CREATE KEYSPACE IF NOT EXISTS test WITH replication =' +
//       "{'class': 'SimpleStrategy', 'replication_factor': '1' }";
//     return client.execute(query);
//   })
//   .then(() => {
//     const query = 'CREATE TABLE IF NOT EXISTS test.RestaurantMenuItems ' +
//       '(restaurantName varchar, menuName text, menuCategoryNames text, menuItemName text, menuItemDescription text, menuItemPrice decimal, restaurantId int, PRIMARY KEY (restaurantId, menuname, menucategorynames, menuitemdescription))';
//     return client.execute(query);
//   }).then((result) => client.shutdown());

let time = new Date().getTime();

const query = 'INSERT INTO test.restaurantmenuitems (restaurantName, menuName, menuCategoryNames, menuItemName, menuItemDescription, menuItemPrice, restaurantId) VALUES (?, ?, ?, ?, ?, ?, ?)';

let queries = [];

function createRestaurantData(idCount, restaurantName) {
  for (let j = 0; j < menuNames.length; j++) {
    for (let k = 0; k < menuCategoryNames.length; k++) {
      for (let l = 0; l < 8; l++) {
        const queryObject = { query };
        const params = [];
        params.push(restaurantName);
        params.push(menuNames[j]);
        params.push(menuCategoryNames[k]);
        params.push(helper.capFirstLet(faker.lorem.words()));
        params.push(helper.capFirstLet(faker.lorem.words()));
        params.push(helper.randomPrice());
        params.push(idCount);
        queryObject.params = params;
        queries.push(queryObject);
      }
    }
  }
}

 function seedDb(count, pageCounter) {
  const id = cluster.worker.id;
  const startPoint = (id - 1) * (100000 / numCPUs) + 1;

  if (count > ((100000 / numCPUs) * id)) {
    console.log('done in ', (new Date().getTime() - time) / 1000, 's O___O');
    return;
  }

  createRestaurantData((startPoint + pageCounter), helper.capFirstLet(faker.lorem.words()));
  
   client.batch(queries, { prepare: true })
    .then(() => {
      queries = [];
      seedDb(count + 1, pageCounter + 1);
    })
    .catch((err) => {
      console.log(err);
    });
}

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`finished in ${new Date()}`);
    console.log(`worker ${worker.process.pid} finished`);
  });
} else {
  const id = cluster.worker.id;
  seedDb((id - 1) * (100000 / numCPUs) + 1, 0);
  console.log(`Worker ${process.pid} started`);
}

