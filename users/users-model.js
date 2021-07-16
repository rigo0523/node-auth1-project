const db = require("../database/dbConfig");

module.exports = {
  get,
  getUsersById,
  updateUserEmail,
  deleteUser,
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

//PATCH /api/users/:id ---> update user by email ID only
function updateUserEmail(id, changes) {
  return db("users")
    .update(changes)
    .where({ id })
    .then((ids) => {
      return db("users")
        .where({ id: id })
        .select("id", "username", "email")
        .orderBy("users.email")
        .first();
    });
}

//DELETE --- /api/users/:id ---> remove the user
function deleteUser(id) {
  return db("users").where({ id }).del();
}

//----------------------AUTH REGISTER/LOGIN-------------------//
//------------------------------------------------------------//
//POST --  /api/auth/register ---> register a new user
function registerUser(user) {}

//POST --  /api/auth/login ---> filter by 'username', login with username
function findBy(filter) {}
//if right password
//------------------------------------------------------------//
//----------------------AUTH REGISTER/LOGIN-------------------//
