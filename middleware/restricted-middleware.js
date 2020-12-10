module.exports = { restricted };

function restricted() {
  return (req, res, next) => {
    if (req.session && req.session.user) {
      next();
    } else {
      res.status(401).json({ data: "you are not authorized to see users" });
    }
  };
}
