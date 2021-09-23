const mainRouter = require("./routes/index.routes");
const methodOverride = require('method-override')
const createError = require("http-errors");
const express = require("express");
const logger = require("morgan");
const path = require("path");
const app = express();
app.use(express.static(path.join(__dirname, "./public")));
app.use(express.urlencoded({ extended: false }));
app.use(logger("dev"));
app.use(express.json());
app.use(methodOverride('_method'))
app.set("view engine", "ejs");
app.set("views", "./src/views");
app.use("/", mainRouter);
app.use((req, res, next) => next(createError(404)));
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.path = req.path;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});
module.exports = app;
