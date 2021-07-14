const bcrypt = require("bcryptjs");
const faker = require("faker");

exports.seed = function (knex) {
  return knex("users").insert([
    {
      username: faker.internet.userName(),
      password: bcrypt.hashSync("test1", 10),
      email: faker.internet.email(),
      role_id: 1,
    },
    {
      username: faker.internet.userName(),
      password: bcrypt.hashSync("test2", 10),
      email: faker.internet.email(),
      role_id: 1,
    },
    {
      username: faker.internet.userName(),
      password: bcrypt.hashSync("test3", 10),
      email: faker.internet.email(),
      role_id: 2,
    },
    {
      username: faker.internet.userName(),
      password: bcrypt.hashSync("test4", 10),
      email: faker.internet.email(),
      role_id: 2,
    },
  ]);
};
