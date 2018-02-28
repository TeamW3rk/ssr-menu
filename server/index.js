const express = require("express");
const db = require("../database/index");
const app = express();

app.use(express.static(__dirname + '/../client/dist'));

app.get("/", (req, res) => res.send("Hello World!"));

let port = 6600;

app.listen(port, () => console.log(`Server is listening on ${port}`));
