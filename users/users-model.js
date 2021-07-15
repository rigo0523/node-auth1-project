const db = require("../database/dbConfig");

module.exports = {
  get,
  getUsersById,
};

//USERS CRUD
//GET /api/users
function get() {
  return db("users")
    .join("roles", "roles.id", "=", "users.role_id")
    .select("users.id", "username", "email", "roles.role");
}

//GET -- /api/users/:id
function getUsersById(id) {
  return db("users")
    .where({ id })
    .select("id", "username", "email", "role_id as role")
    .orderBy("users.id")
    .first();
}
