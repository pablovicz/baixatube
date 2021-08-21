import "./styles.css";
import OptionsButton from "../options-button";
import api from "../../service/api.js";

import ReactPlayer from "react-player";
import GetAppIcon from "@material-ui/icons/GetApp";

import { useState } from "react";

function DownloadOptions(props) {
  const [extension, setExtension] = useState("mp4");
  const [quality, setQuality] = useState("baixa");

  function handleExtensionCallback(optionSelected) {
    setExtension(optionSelected);
  }

  function handleQualityCallback(optionSelected) {
    setQuality(optionSelected);
  }

  async function handleClick() {
    const data = {
      url: props.url,
      extension: extension,
      quality: quality,
    };
    console.log(data);

    await api
      .post("download/", JSON.stringify(data), {
        headers: {
          "accept": "application/json",
          "content-type": "application/json",
        },
      })
      .then((response) => {
        console.log(response.data);
      });

    alert("Video Baixado com Sucesso!");
  }

  return (
    <div className="home-download-container">
      <div className="player-container">
        <ReactPlayer
          className="player-content"
          url={props.url}
          width="100%"
          height="70%"
          config={{
            youtube: {
              playerVars: { showinfo: 1 },
            },
          }}
        />
      </div>
      <div className="options-container">
        <OptionsButton
          label="Extensão"
          option1="mp4"
          option2="mp3"
          parentCallback={handleExtensionCallback}
        />
        <OptionsButton
          label="Qualidade"
          option1="baixa"
          option2="alta"
          parentCallback={handleQualityCallback}
        />
        <button className="btn-download" onClick={() => handleClick()}>
          <GetAppIcon fontSize="large" />
          <h3>BAIXAR</h3>
        </button>
      </div>
    </div>
  );
}

export default DownloadOptions;
