const cassandra = require('cassandra-driver');

const client = new cassandra.Client({ contactPoints: ['h1', 'h2'], keyspace: 'ks1' });

let query = 'INSERT INTO userAuth(email,password) VALUES(req.body.email,req.body.password)';
client.execute(query).then(result => console.log('User with email %s', result.rows[0].email)).catch((error) => {
    console.log(error)
  });
