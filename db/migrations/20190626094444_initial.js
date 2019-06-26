
exports.up = function(knex) {
  return Promise.all([
    knex.schema.createTable('topics', function(table) {
      table.increments('id').primary();
      table.string('category');

      table.timestamps(true, true);
    }),
    
    knex.schema.createTable('authors', function(table) {
      table.increments('id').primary();
      table.string('first_name');
      table.string('last_name');

      table.timestamps(true, true);
    }),

    knex.schema.createTable('snippets', function (table) {
      table.increments('id').primary();
      table.string('title');
      table.string('date');
      table.string('link');
      table.integer('topic_id').unsigned()
      table.foreign('topic_id')
        .references('topics.id');
      table.integer('author_id').unsigned()
      table.foreign('author_id')
        .references('authors.id');

      table.timestamps(true, true);
    })
  ])
};

exports.down = function (knex) {
  return Promise.all([
    knex.schema.dropTable('topics'),
    knex.schema.dropTable('authors'),
    knex.schema.dropTable('snippets'),
  ]);
};