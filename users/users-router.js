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
      user.role = Boolean(user.role);
      res.json(user);
    })
    .catch((err) => next(err));
});

//PATCH /api/users/:id --> only able to update user email
router.patch("/:id", (req, res, next) => {
  const { id } = req.params;
  const userEmail = {
    email: req.body.email,
  };
  Users.updateUserEmail(id, userEmail)
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

//GET /api/users/:id/locations
router.get("/:id/locations", (req, res, next) => {
  const { id } = req.params;
  Users.getUserLocation(id)
    .then((user) => {
      console.log("user---->", user);
      user.powers = Boolean(user.powers);
      res.json(user);
    })
    .catch((err) => next(err));
}); //

//POST /api/users/:id/locations
router.post("/:id/locations", (req, res, next) => {
  const { id } = req.params;
  const location = {
    city: req.body.city,
    age: req.body.age,
    powers: req.body.powers,
  };
  Users.postUserLocation(location, id)
    .then((location) => {
      res.status(201).json(location);
    })
    .catch((err) => next(err));
});

//DELETE /api/users/:ID/LOCATIONS
router.delete("/:id/locations", (req, res, next) => {});

//GET /api/users/:Id/tasks
router.get("/:id", (req, res, next) => {});

//POST /api/users/:id/tasks
router.get("/:id/tasks", (req, res, next) => {});

//DELETE /api/users/:ID/LOCATIONS

module.exports = router;
