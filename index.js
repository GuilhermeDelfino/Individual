process.env.AMBIENTE = "dev";

const express = require("express");
const cors = require("cors");
const app = express();

const PORT = process.env.AMBIENTE === "dev" ? 3000 : 8080;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/app/public"));
app.use(express.static(__dirname + "/app/public/html"));

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(PORT, () => {
  console.log(
    `
            Seu servidor esta rodando no URL: http://localhost:${PORT}/
        `
  );
});
