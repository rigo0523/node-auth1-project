exports.seed = function (knex, Promise) {
  // we want to remove all data before seeding
  // truncate will reset the primary key each time
  return knex("users")
    .truncate()
    .then(function () {
      // add data into insert
      return knex("users").insert([
        { username: "01-users seed", password: "seed" },
      ]);
    });
};
