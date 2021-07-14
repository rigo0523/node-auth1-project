const faker = require("faker");

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("locations").insert([
    {
      city: faker.address.city(),
      age: faker.datatype.number(),
      powers: faker.datatype.boolean(),
    },
    {
      city: faker.address.city(),
      age: faker.datatype.number(),
      powers: faker.datatype.boolean(),
    },
    {
      city: faker.address.city(),
      age: faker.datatype.number(),
      powers: faker.datatype.boolean(),
    },
    {
      city: faker.address.city(),
      age: faker.datatype.number(),
      powers: faker.datatype.boolean(),
    },
  ]);
};
