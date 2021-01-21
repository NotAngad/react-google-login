const express = require("express");
const app = express.Router();
const Controller = require("./controllers");

app.post("/", Controller.googleAuth);

module.exports = app;
