// https://medium.com/@jaeger.rob/seed-knex-postgresql-database-with-json-data-3677c6e7c9bc

const authorData = require('../../../data/authorData.json');
const topicData = require('../../../data/topicData.json');
const snippetData = require('../../../data/snippetData.json');

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('authors').del()
  .then(() => {
    return knex('topics').del();
  })
  .then(() => {
    return knex('snippets').del();
  })
    .then(function () {
      // Inserts seed entries
      return knex('authors').insert([
        
      ]);
    });
};
