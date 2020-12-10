const db = require("../database/dbconfig");

module.exports = {
  find,
  findById,
  findBy,
  add,
};

//find all users on /api/users
function find() {
  return db("users").select("id", "username", "password").orderBy("id");
}

//find by ID
function findById(id) {
  return db("users").where({ id: id }).first();
}

//findBy either username or password or whatever is inside the req.body
// so .where({username: username})
function findBy(filter) {
  return db("users").where(filter).orderBy("id");
}

//ADD a user without ASYNC, more work but worth it
function add(user) {
  return db("users")
    .insert(user, "id")
    .then((ids) => {
      return db("users").where({ id: ids }).first();
    });
}
