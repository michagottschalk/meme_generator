import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [meme, setMeme] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    async function fetchMeme() {
      try {
        const response = await fetch("https://api.imgflip.com/get_memes");
        const json = await response.json();
        setMeme(json.data.memes);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchMeme();
  }, []);

  function handlePrevious() {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  }

  function handleNext() {
    if (currentIndex < meme.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  }

  return (
    <div className="meme_body">
      <h3>MAKE YOUR OWN MEME!</h3>
      {meme.length > 0 ? (
        <div className="meme">
          <div className="meme_img">
            <img src={meme[currentIndex].url} alt="" />
          </div>
          <div className="buttons">
            <button onClick={handlePrevious}>Zurück</button>
            <button onClick={handleNext}>Vor</button>
          </div>
        </div>
      ) : (
        <p>Loading Meme ...</p>
      )}
      <div className="type">
        <form>
          <input type="text" className="field_one" />
          <input type="text" className="field_two" />
        </form>
      </div>
      <div className="upload">
        <form>
          <input type="file" id="input" multiple />
          <button type="submit">Absenden</button>
        </form>
      </div>
    </div>
  );
}

export default App;
