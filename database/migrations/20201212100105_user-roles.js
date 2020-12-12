exports.up = function (knex) {
  return knex.schema.table("users", (tbl) => {
    tbl.text("role", 123);
  });
};

exports.down = function (knex) {
  return knex.schema.table("users", (tbl) => {
    tbl.dropColumn;
  });
};
