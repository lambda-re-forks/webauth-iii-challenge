const helmet = require("helmet");
const morgan = require("morgan");
const express = require("express");

module.exports = server => {
  server.use(helmet());
  server.use(morgan("dev"));
  server.use(express.json());
};
