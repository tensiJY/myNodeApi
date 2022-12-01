const express = require("express");
const bodyParser = require(`body-parser`);
const apiRoutes = require("./routes/api");

const app = express();

//  form and json
//app.use(bodyParser.urlencoded()); //  x-www-form-urlencoded
app.use(bodyParser.json()); //  application/json

app.use("/api", apiRoutes);

app.listen(8080, () => {
  console.log(`server is listening >>> localhost:8080`);
});
