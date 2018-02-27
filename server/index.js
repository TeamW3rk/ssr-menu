const express = require("express");
const app = express();

app.use(express.static(__dirname + '/../client/dist'));

app.get("/", (req, res) => res.send("Hello World!"));

let port = 3000;

app.listen(port, () => console.log(`Server is listening on ${port}`));
