const Sequelize = require('sequelize');
const SequelizeModels = require('./index.js');

const sequelize = new Sequelize('test', 'postgres', 'postgres', {
    host: 'localhost',
    // uncomment port if using Postgres.app
    port: 5432,
    dialect: 'postgres',
    logging: false,
  });

  var time = new Date().getTime();

SequelizeModels.RestaurantMenuItems.findOne({
    where: {
        restaurantId: 1029
    }
}).then(results => {
    console.log(results.length)    
    console.log('queried in ', (new Date().getTime() - time) / 1000, 's');
});
