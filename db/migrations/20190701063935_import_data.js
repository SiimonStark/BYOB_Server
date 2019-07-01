
exports.up = function(knex) {
  return Promise.all([
    knex.schema.table('authors', table => {
      table.string('link');
    }),
    knex.schema.table('topics', table => {
      table.string('link');
    })
  ])
};

exports.down = function(knex) {
  return Promise.all([
    knex.schema.dropColumn('link'),
    knex.schema.dropColumn('link')
  ])
};
