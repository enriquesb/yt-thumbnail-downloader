const express = require('express');
const app = express();
const port = 3000;

require('dotenv').config()
const apiKey = process.env.YT_API_KEY;

const baseUrl = "https://youtube.googleapis.com/youtube/v3/videos?part=snippet";
const re = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/|shorts\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;

app.get('/thumbnails', async (req, res) => {
  const videoUrl = req.query.videoUrl;
  const videoId = videoUrl.match(re)[1];
  const fetchUrl = `${baseUrl}&id=${videoId}&key=${apiKey}`;

  try {
    const response = await fetch(fetchUrl);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    const thumbnailsInfo = json.items[0].snippet.thumbnails;
    res.send(thumbnailsInfo);
  } catch(error) {
    console.error(error.message);
  }
})

app.listen( port, () =>{
  console.log(`App listening in port ${port}`);
})
