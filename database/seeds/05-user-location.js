exports.seed = function (knex) {
  return knex("user_location").insert([
    { user_id: 1, location_id: 1 },
    { user_id: 2, location_id: 2 },
    { user_id: 3, location_id: 3 },
    { user_id: 4, location_id: 4 },
  ]);
};
