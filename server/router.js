const express = require('express');
const path = require('path');
const db = require('../database/helper.js');
const bodyParser = require('body-parser');
const cassandraDb = require('../database/cassandraquery.js');
const router = express.Router();

router.use('/:id', express.static(path.join(__dirname, '/../client/dist')));
router.use(bodyParser.json());

router.get('/:id/menu', (req, res) => {
  console.log('got here', req.params)
  const { id } = req.params;
  if (id > 0 && id < 201) {
    
    cassandraDb.fetch(id, data => res.status(200).send(JSON.stringify(data)));
    res.status(200)
  } else {
    res.status(404).send('No such restaurant ID');
  }
});

router.get('*', (req, res) => {
  res.status(404).send('Invalid Restaurant ID');
});

module.exports = router;
