const jwt = require("jsonwebtoken");
module.exports = { restricted };

function restricted() {
  return (req, res, next) => {
    const token = req.headers.authorization;

    //see if there is a token
    //assuming there is one
    //chec if it is valid ---> rehas the header + payload and seecret
    //and see if it matches our verify signature
    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
        if (err) {
          console.log("failed verify token------->", err);
          res.status(401).json({ message: "not verified" });
        } else {
          //token is valid if here
          console.log("decodedToken----->", decodedToken);
          req.decodedToken = decodedToken;
          next();
        }
      });
    } else {
      res.status(400).json({ message: "no token provided" });
    }
  };
}
