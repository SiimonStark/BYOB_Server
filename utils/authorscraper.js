const Nightmare = require('nightmare');
const nightmare = Nightmare({ show: true });
const jquery = require('jquery');
const fs = require('fs');

nightmare
  .goto('https://css-tricks.com/snippets/javascript/')
  .evaluate(() => {
    let writers = [];
    let authors;

    $('.snippet-author-link').each(function () {
      let item = {};
      item['link'] = $(this).attr('href');
      item['name'] = $(this).text()
        .replace(/\n/, '')
        .trim();

      writers.push(item);
    });

    authors = writers.reduce((acc, w) => {
      let name = w.name.split(' ');
      let writer = {
        first_name: name[0], last_name: name[1], link: w.link
      }

      let check = acc.find(accWriter => {
        return accWriter.link === writer.link
      })

      if (!check){
       acc.push(writer)
     }

      return acc
    }, [])

    return authors;
  })
  .end()
  // .then(result => console.log(result))
  .then((anchors) => {
    fs.writeFileSync('./utils/authorData.json', JSON.stringify(anchors));
    console.log('Done: ', anchors)
  })
  .catch(error => {
    console.error(`Search failed: ${error}`)
  });