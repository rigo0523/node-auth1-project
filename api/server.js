const express = require("express");
const router = express.Router();
const helmet = require("helmet");
const cors = require("cors");
const session = require("express-session");
const KnexSessionStore = require("connect-session-knex")(session);
//server
const server = express();

//welcome, users and auth routers
const welcomeRouter = require("../welcome/welcome-router");
const usersRouter = require("../users/users-router");
const authRouter = require("../auth/auth-router");

// SESSION CONFIG
const sessionConfig = {
  name: "sessionID",
  secret: "keep this cookie a secret",
  cookie: {
    maxAge: 3600 * 1000, // amount of seconds/ minute/hours to expire
    secure: false, // HTTPS, it's the lock icon on url bar//
    //secure:false, normallly it's TRUE, in our setup local machine
    // we dont have a certicate and can't do HTTPS against EXPRESS, there's a way to configure express so that it can work with the certificate, there's a way to set it up, for now USE FALSE
    httpOnly: true, // http not secure, testing purposes use HTTP
    //https is recommended, TELLS JAVASCRIPT IF WE CAN ACCESS TO cookie
  },
  // only save the session and cookie if the user allows you to
  resave: false,
  saveUninitialized: false, //doesnt contain
  store: new KnexSessionStore({
    knex: require("../database/dbconfig"),
    tablename: "sessions", //this creates a table inside the DB next to users
    //this can be named sID or id because it's inside sessions table
    sidfieldname: "session_id", // it's a column that has your session id
    createtable: true, //if no table of sessions name, this creates it in DB next to users
    clearInterval: 3600 * 1000, // session will be store for this time, after this, it deletes again
  }),
};

//Global middleware
server.use(session(sessionConfig));
server.use(helmet());
server.use(cors());
server.use(express.json());

//Server endpoints --------->
//GET welcome router /5000
server.use("/", welcomeRouter);
//GET /api/users
server.use("/api/users", usersRouter);
//GET /api/auth REGISTER, LOGIN, LOGOUT
server.use("/api/auth", authRouter);

module.exports = server;

//npi i express-session

// let x = {
//   cookie: {
//     originalMaxAge: 3600000,
//     expires: "2021-02-11T05:51:34.160Z",
//     secure: false,
//     httpOnly: true,
//     path: "/",
//   },
//   user: {
//     id: 2,
//     username: "test1",
//     password: "$2a$10$Qx4srJjVd1DTTxjpu5HukOLY134KHLFYFOWrwcenpNk1FPo6va3xC",
//   },
// };
