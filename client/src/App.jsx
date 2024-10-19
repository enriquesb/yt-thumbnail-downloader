import "./App.css";
import { useState } from 'react'

const backendApi = "http://localhost:3000/api/thumbnails";

function Thumbnails({ thumbnailsData }) {
  return (
    <div>
      <h2>Thumbnails:</h2>
      <ul>
        {Object.entries(thumbnailsData).map(([key, value]) => (
          <div className="thumbnail-card" key={key}>
            <div className="tn-image">
              <img src={value.url} />
            </div>
            <div className="tn-description">
              <h3>{key}</h3>
              <p>Width: {value.width} px</p>
              <p>Height: {value.height} px</p>
              <p> <a href={value.url} target="blank">Download Image</a></p>
            </div>
          </div>
        ))}
      </ul>
    </div>
  )
}

function App() {
  const [videoUrl, setVideoUrl] = useState('');
  const [thumbnailsData, setThumbnailsData] = useState(null);
  const [error, setError] = useState(null);

  async function fetchThumbnails() {
    try {
      const response = await fetch(`${backendApi}?videoUrl=${videoUrl}`)
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const json = await response.json();
      setThumbnailsData(json);
    } catch (error) {
      console.error(error.message);
      setError(error);
    }
  }

  return (
    <div>
      <h1>YT Thumbnail Downloader</h1>
      <label htmlFor="video-url">Paste youtube video URL: </label>
      <input
        type="text"
        id="video-url"
        onChange={(e) => setVideoUrl(e.target.value)}>
      </input>

      <button
        onClick={fetchThumbnails}
        disabled={videoUrl.length === 0}>Get Thumbnails
      </button>

      {thumbnailsData && <Thumbnails thumbnailsData={thumbnailsData} />}

      {error && <p> Error: {error.message}</p>}
    </div>
  );
}

export default App;
