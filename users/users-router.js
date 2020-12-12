const express = require("express");
const { restricted } = require("../middleware/restricted-middleware");
const router = express.Router();
const Users = require("./users-model");

//GET /api/users
router.get("/", restricted(), (req, res, next) => {
  const { subID, role } = req.jwtToken;

  console.log("rwttoken here----->", req.jwtToken);
  if (role === "admin") {
    Users.find()
      .then((user) => {
        console.log("list users----->", user);
        res.json(user);
      })
      .catch((err) => {
        //500 error
        next(err);
      });
  } else {
    Users.findById(subID).then((single) => {
      single
        ? res.status(200).json({ message: single })
        : res.status(404).json({
            message:
              "you cant see anyone, not even your user because no valid token",
          });
    });
  }
});

module.exports = router;
