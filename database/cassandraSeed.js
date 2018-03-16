const cassandra = require('cassandra-driver');

const client = new cassandra.Client({ contactPoints: ['127.0.0.1'], keyspace: 'ks1' });

let query = 'INSERT INTO userAuth(email,password) VALUES(req.body.email,req.body.password)';
client.execute(query).then(result => console.log('User with email %s', result.rows[0].email)).catch((error) => {
    console.log(error)
  });
