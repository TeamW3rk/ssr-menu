const cassandra = require('cassandra-driver');
const client = new cassandra.Client({ contactPoints: ['127.0.0.1'] });
const time = new Date().getTime();

const fetch = function (id, callback) {
  const query = `SELECT * FROM test.restaurantmenuitems WHERE restaurantid = ${id} ALLOW FILTERING;`
   client.execute(query).then((result) => {
     callback(result.rows);
  });
};



module.exports.fetch = fetch;
