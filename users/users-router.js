const express = require("express");
const { restricted } = require("../middleware/restricted-middleware");
const router = express.Router();
const Users = require("./users-model");

//GET /api/users
router.get("/", restricted(), (req, res, next) => {
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
