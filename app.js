const express = require(`express`);
const bodyParser = require(`body-parser`);
const mongoose = require(`mongoose`);

const apiRoutes = require(`./routes/api`);

const app = express();

//  form and json
//app.use(bodyParser.urlencoded()); //  x-www-form-urlencoded
app.use(bodyParser.json()); //  application/json

//  cors
app.use((req, res, next) => {
  res.setHeader(`Access-Control-Allow-Origin`, `*`);
  res.setHeader(
    `Access-Control-Allow-Methods`,
    `OPTIONS, GET, POST, PUT, PATCH, DELETE`
  );
  res.setHeader(`Access-Control-Allow-Headers`, `Content-Type, Authorization`);
  next();
});

app.use(`/api`, apiRoutes);

mongoose
  .connect(
    "mongodb+srv://:wndud58@cluster0.f7veanw.mongodb.net/messages?retryWrites=true&w=majority"
  )
  .then((result) => {
    const server = app.listen(8080, () => {
      console.log(`server is listening >>> localhost:8080`);
    });
    const io = require(`socket.io`)(server);
    io.on(`connection`, (socket) => {
      console.log(`client connectd`);
    });
  })
  .catch((err) => console.log(err));

/*
app.listen(8080, () => {
  console.log(`server is listening >>> localhost:8080`);
});
*/
