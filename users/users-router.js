const express = require("express");
const router = express.Router();
const Users = require("./users-model");

//GET /api/users
router.get("/", (req, res, next) => {
  Users.get()
    .then((user) => {
      res.json(user);
    })
    .catch((err) => next(err));
});

//GET /api/users/:id
router.get("/:id", (req, res, next) => {
  Users.getUsersById(req.params.id)
    .then((user) => {
      res.json(user);
    })
    .catch((err) => next(err));
});

module.exports = router;
