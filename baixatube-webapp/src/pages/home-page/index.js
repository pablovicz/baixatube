import "./styles.css";
import DownloadOptions from "../../components/download-options";
import Loading from "../../components/loading";

import { useState } from "react";

import PlayArrowIcon from "@material-ui/icons/PlayArrow";

function HomePage() {
  const [loading, setLoading] = useState(true);
  const [url, setUrl] = useState("");
  const [showDownloadOptions, setShowDownloadOptions] = useState(false);
  const [result, setResult] = useState('');

  function handleSubmit() {
    let urlIsValid = url.includes("https://www.youtube.com/");
    if (urlIsValid) {
      setLoading(true);
      setShowDownloadOptions(true);
      setTimeout(() => setLoading(false), 100);
    }
  }

  function handleChange(event) {
    let url = event.target.value;
    setUrl(url);
    if (url === "" && showDownloadOptions) {
      setLoading(true);
      setShowDownloadOptions(false);
    }
  }

  function handleChildCallback(response){
    setResult(response)
    if(response === 'success') {
      setShowDownloadOptions(false);
    }
  }
  

  return (
    <div id="home-page">
      <div className="home-content">
        <h1 className="home-title">Baixador de Vídeo Online</h1>
        <div className="home-input-container">
          <input
            placeholder="Insira a url do seu video aqui"
            type="text"
            id="url"
            value={url}
            onChange={(event) => handleChange(event)}
          />
          <button
            type="button"
            className={url.includes("https://www.youtube.com/") ? 
                      "play-button" : 
                      "play-button pb-disabled"
                    }
            onClick={() => handleSubmit()}
          >
            <PlayArrowIcon fontSize="large" />
          </button>
        </div>
        {showDownloadOptions ? (
          loading ? (
            <Loading />
          ) : (
            <DownloadOptions url={url} parentCallback={handleChildCallback}/>
          )
        ) : (<div></div>)
        }
      </div>
    </div>
  );
}

export default HomePage;
