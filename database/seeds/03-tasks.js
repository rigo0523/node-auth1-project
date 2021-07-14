const faker = require("faker");

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("tasks").insert([
    { notes: faker.random.words(), user_id: 1 },
    { notes: faker.random.words(), user_id: 2 },
    { notes: faker.random.words(), user_id: 3 },
    { notes: faker.random.words(), user_id: 4 },
  ]);
};
