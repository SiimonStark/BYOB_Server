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
      return knex('authors').insert(authorData);
    })
    .then(function() {
      return knex('topics').insert(topicData);
    })
    .then(function() {
      let snippetsPromise = [];
      snippetData.forEach((article) => {
        let author = article.author.last_name;
        let topic = article.topic;

        snippetsPromise.push(createSnippet(knex, article, author, topic));
      })
    })
};

const createSnippet = (knex, article, author, topic) => {
  return knex('authors').where('last_name', author).first()
  .then((authorRecord) => {
    return knex('topics').where('category', topic).first()
    .then((topicRecord) => {
      return knex('snippets').insert({
        title: article.title,
        link: article.link,
        date: article.updated,
        topic_id: topicRecord.id,
        author_id: authorRecord.id
      });
    });
  });
}
