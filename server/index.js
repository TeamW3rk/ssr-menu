const express = require("express");
const path = require('path');
const router = require('./router.js');
const app = express();

app.use(express.static(path.join(__dirname + '/../client/dist')));

app.use('/r', router);

app.get("*", (req, res) => {
  res.status(404).send('Invalid URL');
});

let port = 6600;

app.listen(port, () => console.log(`Server is listening on ${port}`));
