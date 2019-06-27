const Nightmare = require('nightmare');
const nightmare = Nightmare({ show: true });
const jquery = require('jquery');
const fs = require('fs');

nightmare
  .goto('https://css-tricks.com/snippets/javascript/')
  .evaluate(() => {
    let categories = [];
    let topics;

    $('.snippet-category > a').each(function () {
      let item = {};
      item['link'] = $(this).attr('href');
      item['cat'] = $(this).text()
        .replace(/\n/, '')
        .trim();

      categories.push(item);
    });

    topics = categories.reduce((acc, c) => {
      let check = acc.find(accCat => {
        return accCat.link === c.link;
      })

      if (!check) {
        acc.push(c);
      }

      return acc
    }, [])

    return topics;
  })
  .end()
  // .then(result => console.log(result))
  .then((anchors) => {
    fs.writeFileSync('./utils/topicData.json', JSON.stringify(anchors));
    console.log('Done: ', anchors)
  })
  .catch(error => {
    console.error(`Search failed: ${error}`)
  });