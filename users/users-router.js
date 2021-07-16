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

//PATCH /api/users/:id --> only able to update user email
router.patch("/:id", (req, res, next) => {
  const { id } = req.params;
  Users.updateUserEmail(id, { email: req.body.email })
    .then((user) => {
      console.log(user);
      res.json(user);
    })
    .catch((err) => next(err));
});

//DELETE api/users/:id --->
router.delete("/:id", (req, res, next) => {
  const { id } = req.params;
  Users.deleteUser(id)
    .then((user) => {
      res.json({ user_deleted: `deleted Id: ${id}, ${req.body.username}` });
    })
    .catch((err) => next(err));
});

module.exports = router;
