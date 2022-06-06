process.env.hashKey = 'delfino';
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3000;

app.set("view engine", "ejs");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('views', __dirname + '/app/public/view');
app.use(express.static(__dirname + "/app/public"));

//? GETTING ROUTES
const screenRoute = require('./app/src/routes/ScreensRoutes');
const userRoute = require('./app/src/routes/UserRoute');
const commentRoute = require('./app/src/routes/CommentRoute');
const clipRoute = require('./app/src/routes/ClipRoute');

app.use('/', screenRoute);
app.use('/user', userRoute);
app.use('/comment', commentRoute);
app.use('/clip', clipRoute);

app.listen(PORT, () =>
  console.log(`Seu servidor esta rodando no URL: http://localhost:${PORT}/`)
);
