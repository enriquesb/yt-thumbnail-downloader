import './App.css'

function App() {
  return (
    <>
      <h1>YT Thumbnail Downlaoder</h1>
      <form>
        <label htmlFor='video-url'>Paste youtube video URL: </label>
        <input type='text' id='video-url'></input>
        <input type='submit'></input>
      </form>
      <p>list of thumbnails:</p>
      <ul>
        <li>Thumbnail #1</li>
        <li>Thumbnail ...</li>
        <li>Thumbnail N</li>
      </ul>
    </>
  )
}

export default App
