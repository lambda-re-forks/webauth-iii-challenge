const express = require("express");

const userRouter = require("./users/userRouter");

const configuremiddleware = require("./configureMiddleware");

const server = express();
configuremiddleware(server);

server.get("/", (req, res) => res.send("<h1>WebAuth-III</h1>"));
server.use("/api", userRouter);
