exports.seed = function (knex, Promise) {
  // we want to remove all data before seeding
  // truncate will reset the primary key each time
  // return knex("users")// no need for this anymore if we use knex cleaner seed
  //   .truncate()
  //   .then(function () {
  // add data into insert
  return knex("users").insert([{ username: "test", password: "test" }]);
  // }); // no need for this anymore if we use knex cleaner seed
};
