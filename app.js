const express = require(`express`);
const mongoose = require(`mongoose`);
const path = require(`path`);

const apiRoutes = require(`./routes/api`);

const app = express();

//  form and json
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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

//  정적 자원 활용
console.log(path.join(__dirname, `images`));
app.use(`/images`, express.static(path.join(__dirname, `images`)));

app.use(`/api`, apiRoutes);

//  에러 핸들러
app.use((err, req, res, next) => {
  console.log(err);
  const status = err.statusCode || 500;
  const message = err.message;
  res.status(status).json({
    message: message,
    path: req.path,
  });
});
//
mongoose
  .connect(
    "mongodb+srv://park:wndud58@cluster0.f7veanw.mongodb.net/messages?retryWrites=true&w=majority"
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
