const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();
let Parser = require('rss-parser');
let parser = new Parser();
app.use(express.static(path.resolve(__dirname, '../client/build')));
app.get("/api",(req, res)=> {
    res.json({message: "Hello from server!"});
});
app.get("/feed",async (req,res)=> {
    try {
        const url = req.query.url;
        if(!url){
            res.status(400).send('Missing "url" query parameter.');
            return;
        }
        let feed = await parser.parseURL(url);
        console.log(feed.title);
        
        feed.items.forEach((episode, index)=> {
          console.log(`Episode ${index + 1}:`);
          console.log('Title:', episode.title);
          console.log('Link:', episode.enclosure.url);
        });
        res.json(feed);
    } catch (error) {
        console.error("Error parsing the feed: ",error);
        res.status(500).send("Internal Server Error");
    }
});
app.get('*',(req,res) => {
    res.sendFile(path.resolve(__dirname,'../client/build','index.html'));
});
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
