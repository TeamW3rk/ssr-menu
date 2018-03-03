const express = require("express");
const db = require("../database/index");
const app = express();

app.use(express.static(__dirname + '/../client/dist'));

app.get("/:id/menu", (req, res) => {

  const id = req.params.id;

  if (0 < id && id < 201) {
    db.fetch(id, (data) => res.send(JSON.stringify(data)));
  } else {
    res.status(404);
    res.send('No such restaurant ID');
  }
});
  
let port = 6600;

app.listen(port, () => console.log(`Server is listening on ${port}`));
