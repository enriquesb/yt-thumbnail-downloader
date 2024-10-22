import "./App.css";
import { useState } from 'react'

const backendApi = `${window.location.origin}/api/thumbnails`;

function Thumbnails({ thumbnailsData }) {
  return (
    <div>
      <h2>Retrieved Thumbnails:</h2>

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

    </div>
  )
}

function App() {
  const [videoUrl, setVideoUrl] = useState('');
  const [thumbnailsData, setThumbnailsData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  async function fetchThumbnails() {
    setIsLoading(true);
    setError(null);
    setThumbnailsData(null);
    try {
      const response = await fetch(`${backendApi}?videoUrl=${videoUrl}`)
      if (!response.ok) {
        const json = await response.json();
        throw new Error(json.error || `Response status: ${response.status}`);
      }
      const json = await response.json();
      setThumbnailsData(json);
    } catch (error) {
      console.error(error.message);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      <h1>YT Thumbnail Downloader</h1>
      <input
        type="text"
        className="video-url-input"
        placeholder="Paste a youtube video URL"
        onChange={(e) => setVideoUrl(e.target.value)}>
      </input>

      <button
        onClick={fetchThumbnails}
        disabled={videoUrl.length === 0}>Get Thumbnails
      </button>



      {error && <p className='error-message'> Error: {error.message}</p>}
      {isLoading && <p>Loading...</p>}
      {thumbnailsData && <Thumbnails thumbnailsData={thumbnailsData} />}

    </div>
  );
}

export default App;
