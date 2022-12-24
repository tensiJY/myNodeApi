const express = require(`express`);
const mongoose = require(`mongoose`);
const path = require(`path`);
const multer = require(`multer`);

const apiRoutes = require(`./routes/api`);

const app = express();

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

//  form and json
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//  정적 자원 활용
console.log(path.join(__dirname, `images`));

//  파일 저장 제어
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `images`);
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + `-${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === `image/png` ||
    file.mimetype === `image/jpg` ||
    file.mimetype === `image/jpeg`
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single(`image`)
);
app.use(`/images`, express.static(path.join(__dirname, `images`)));

app.use(`/api`, apiRoutes);

//  에러 핸들러
app.use((err, req, res, next) => {
  console.log(err);
  const status = err.statusCode || 500;
  const message = err.message;
  const data = err.data;
  res.status(status).json({
    message: message,
    path: req.path,
    data: data,
  });
});
//
/*
mongoose
  .connect("mongodb://localhost:27017/message")
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
*/

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
