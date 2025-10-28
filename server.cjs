const express = require("express");
const path = require("path");

const app = express();
const { port = 3000 } = process.env;

app.use(express.static(path.join(__dirname, "dist")));

app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});
