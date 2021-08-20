import "./styles.css";
import DownloadOptions from "../../components/download-options";
import Loading from "../../components/loading";

import { useState } from "react";

import PlayArrowIcon from "@material-ui/icons/PlayArrow";

function HomePage() {
  const [loading, setLoading] = useState(true);

  const [url, setUrl] = useState("");
  const [showDownloadOptions, setShowDownloadOptions] = useState(false);

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

  return (
    <div className="home-container">
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
            <DownloadOptions url={url} />
          )
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}

export default HomePage;
