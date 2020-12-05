const express = require("express");
const server = require("../api/server");
const router = express.Router();

const Users = require("../users/users-model");

//POST ---> REGISTER ---> /api/auth/register
router.post("/register", (req, res, next) => {
  //
  const user = req.body;

  Users.add({
    username: user.username,
    password: user.password,
  })
    .then((newUser) => {
      console.log("newUser-->", newUser);
      newUser
        ? res.status(200).json({ new_user: newUser })
        : res.status(400).json({ error: `Can't register that users` });
    })
    .catch((err) => {
      next(err);
    });
});

//POST ----> LOGIN ----> /api/auth/login
router.post("/login", (req, res, next) => {
  //user REQ.BODY
  const user = req.body;
  //find by logged in user and registered already
  Users.findBy({ username: user.username })
    .then((registeredUser) => {
      console.log("registeredUser------>", registeredUser);
      registeredUser !== registeredUser
        ? res.status(200).json({ user_login: `welcome ${user.username}` })
        : res.status(400).json({
            erro: `can't find user by ${user.username} CANT login`,
          });
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
