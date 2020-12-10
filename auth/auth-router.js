require("dotenv").config();
const express = require("express");
const server = require("../api/server");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const Users = require("../users/users-model");

//POST ---> REGISTER ---> /api/auth/register
router.post("/register", (req, res, next) => {
  //
  const user = req.body;
  const hashedPassword = bcrypt.hashSync(user.password, 10);

  Users.add({
    username: user.username,
    password: hashedPassword,
  })
    .then((newUser) => {
      console.log("newUser-->", newUser);
      // a jwt should be generated
      const token = generateToken(newUser);
      newUser
        ? res.status(201).json({ new_user: newUser, token })
        : res.status(400).json({ error: `Can't register that users` });
    })
    .catch((err) => {
      next(err);
    });
});

//POST ----> LOGIN ----> /api/auth/login
router.post("/login", (req, res, next) => {
  //user REQ.BODY
  const { username, password } = req.body;

  //find by logged in user and registered already
  Users.findBy({ username })
    .first()
    .then((user) => {
      console.log("Login user------>", user);
      /// a jwt shoul be generated
      if (user && bcrypt.compareSync(password, user.password)) {
        // a jwt should be generated here instead
        const token = generateToken(user);

        res.status(200).json({ user_login: `welcome ${user.username}`, token });
      } else {
        res.status(400).json({
          erro: `can't find user by ${user.username} CANT login`,
        });
      }
    })
    .catch((err) => {
      next(err);
    });
});

router.get("/logout", (req, res) => {
  console.log("logging out endpoint");
  if (req.session) {
    req.session.destroy((err) => {
      err
        ? res.json({ message: "you cant logout yet" })
        : res.json({ message: "logged out" });
    });
  } else {
    res.json({ message: "this user doesn't even exist at all" });
  }
});

function generateToken(user) {
  //header payload and verfiy signature
  //payload -> username, id
  const payload = {
    sub: user.id,
    username: user.username,
  };
  // v signature -> a secret
  const options = {
    expiresIn: "100", //millseconds
  };

  //return the paylod, secret from ENV file and options duration in time
  return jwt.sign(payload, process.env.JWT_SECRET, options);
}

module.exports = router;
