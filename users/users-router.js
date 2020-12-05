const express = require("express");
const { orWhereNotExists } = require("../database/dbconfig");
const router = express.Router();
const Users = require("./users-model");

//GET /api/users
router.get("/", (req, res, next) => {
  Users.find()
    .then((user) => {
      console.log(user);
      res.json(user);
    })
    .catch((err) => {
      //500 error
      next(err);
    });
});

module.exports = router;
