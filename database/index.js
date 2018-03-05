const Sequelize = require('sequelize');
const helper = require('./helper');

const sequelize = new Sequelize('menus', 'Joe', '', {
  host: 'localhost',
  port: 5554,
  dialect: 'postgres',
});

// overwrites current data and stores new
sequelize
  .sync({
    force: true,
  })
  .then(() => {
    helper.create();
  });
