const Nightmare = require('nightmare');
const nightmare = Nightmare({ show: true });
const jquery = require('jquery');


nightmare
.goto('https://css-tricks.com/snippets/javascript/')
.evaluate(() => {
  var snippets = [];
  var authors = [];
  var topics = [];
    $('.snippet-title').each(function() {
      let item = {};
      console.log('What is THIS', $(this))
      item["link"] = $(this).attr('href');
      item["title"] = $(this).text()
        .replace();
      snippets.push(item);
    })
    let nameNodes = document.querySelectorAll('.snippet-title');
    let list = [].slice.call(nameNodes);

    return snippets;

    return list.map(function(node) {
      return node.innerText
    })
  })
  .end()
  .then((result) => console.log(result))
  .catch(error => {
    console.error('Search failed: error')
  });