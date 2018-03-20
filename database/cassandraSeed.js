const cassandra = require('cassandra-driver');
const async = require('async');
const helper = require('./helper');
const faker = require('faker');

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
//       '(id UUID, restaurantId text, menuName text, menuCategoryNames text, menuItemName text, menuItemDescription text, menuItemPrice decimal, PRIMARY KEY (id))';
//     return client.execute(query);
//   }).then((result) => client.shutdown());

var time = new Date().getTime();

const query = 'INSERT INTO menus.restaurantmenuitems (id, restaurantId, menuName, menuCategoryNames, menuItemName, menuItemDescription, menuItemPrice) VALUES (uuid(), ?, ?, ?, ?, ?, ?)';

var queries = [];

function createRestaurantData() {
  for (let j = 0; j < menuNames.length; j += 1) {
    for (let k = 0; k < menuCategoryNames.length; k += 1) {
      for (let l = 1; l <= 9; l += 1) {
        const queryObject = { query };
        var params = [];
  
        params.push(helper.capFirstLet(faker.lorem.words()));
        params.push(menuNames[j]);
        params.push(menuCategoryNames[k]);
        params.push(helper.capFirstLet(faker.lorem.words()));
        params.push(helper.capFirstLet(faker.lorem.words()));
        params.push(helper.randomPrice());
    //might be overwriting here.
        queryObject['params'] = params;
        queries.push(queryObject);
      }
    }
  }
  // createRestaurantData(restaurantId + 1, baseCase);
}

async function seedDb(count) {
  if (count > 92592) {
    console.log('done in ', (new Date().getTime() - time) / 1000, 's :3 ^_^ <3 <(^_^<)');
    return ;
  }
  createRestaurantData();
 await client.batch(queries, { prepare: true })
    .then(() => {
    // All queries have been executed successfully
      
    seedDb(count + 1);
    queries = [];
    })
    .catch((err) => {
      console.log(err);
    // None of the changes have been applied
    });
};

seedDb(1);

 

