const jwt = require("jsonwebtoken");
require("dotenv").config();
module.exports = { restricted };

function restricted() {
  return (req, res, next) => {
    //tolen validation
    const token = req.headers.authorization;
    ///check if there is a token and if valid, send it back to the logged in user
    //the const token is what we got when we registed and when we logged in, we can use
    //that token inside Header: Authorization  and copy/paste token received on logging in
    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
        //after verifying make sure that we get the error first and then else
        //will give us true
        if (err) {
          console.log("error in jwt.verify------->", err);
          res.status(404).json({ message: "your token is not valid" });
        } else {
          //you can use req.jwtToken to access the subID, name, and role now,
          //use req.jwtToken in the users endpoint to show list of admin users
          //by req.jwtToken.role and if it equals admin show all users, else show nothing or
          //single user
          req.jwtToken = decodedToken;
          next();
        }
      });
    } else {
      res.json({ message: "you never had a token here" });
    }
  };
}
