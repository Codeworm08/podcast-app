let Parser = require('rss-parser');
let parser = new Parser();

(async () => {

  let feed = await parser.parseURL('https://www.hiddenhistoryhappyhour.com/feed/podcast');
  console.log(feed.title);

  feed.items.forEach((episode, index)=> {
    console.log(`Episode ${index + 1}:`);
    console.log('Title:', episode.title);
    console.log('Link:', episode.enclosure.url);
  });

})();