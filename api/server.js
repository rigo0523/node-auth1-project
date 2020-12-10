const express = require("express");
const router = express.Router();
const helmet = require("helmet");
const cors = require("cors");
require("dotenv").config();

//server
const server = express();

//import users router
const usersRouter = require("../users/users-router");
const authRouter = require("../auth/auth-router");

//Global middleware
server.use(helmet());
server.use(cors());
server.use(express.json());

//SERVER endpoints ----------------->
///GET /api/users
server.use("/api/users", usersRouter);
// Auth router
server.use("/api/auth", authRouter);

//GLOBAL .catch middleware 500 error
server.use((err, req, res, next) => {
  console.log("err------>", err);
  res.status(500).json({ error: "500 error what happened" });
});

//server Welcome endpoint
server.use("/", (req, res) => {
  res.json({ API: "api is working --" });
});

module.exports = server;
