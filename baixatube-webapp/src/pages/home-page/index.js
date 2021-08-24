import "./styles.css";
import DownloadOptions from "../../components/download-options";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";

function HomePage() {
  const [loading, setLoading] = useState(true);
  const [url, setUrl] = useState("");
  const [showDownloadOptions, setShowDownloadOptions] = useState(false);
  // eslint-disable-next-line
  const [result, setResult] = useState("");

  async function checkElement(selector){
    while(!document.querySelector(selector)) {
      await new Promise(r => setTimeout(r, 500));
    }
  }

  function handleSubmit() {
    console.log(url);
    let urlIsValid = url.includes("https://www.youtube.com/");
    if (urlIsValid) {
      setLoading(true);
      setShowDownloadOptions(true);
      checkElement("#widget4").then(setLoading(false));
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

  function handleChildCallback(response) {
    setResult(response);
    if (response === "success") {
      setShowDownloadOptions(false);
      setUrl("");
    }
    if (response ===  'error') {
      handleSubmit();
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
            className={
              url.includes("https://www.youtube.com/")
                ? "play-button"
                : "play-button pb-disabled"
            }
            onClick={() => handleSubmit()}
          >
            <PlayArrowIcon fontSize="large" />
          </button>
        </div>
        <ToastContainer draggable={false} autoclose={4000} className="toast" position={toast.POSITION.TOP_RIGHT}/>
        {showDownloadOptions ? (
          <DownloadOptions
            videoId={url.split('=')[1]}
            parentCallback={handleChildCallback}
            onLoading={loading}
          />
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}

export default HomePage;
