import "./styles.css";
import OptionsButton from "../options-button";
import api from "../../service/api.js";
import browserFileDownloader from "../../service/helper.js"

import ReactPlayer from "react-player";
import GetAppIcon from "@material-ui/icons/GetApp";
import ReactLoading from "react-loading";
import { toast } from "react-toastify";

import { useState } from "react";

function DownloadOptions(props) {
  const [extension, setExtension] = useState("mp4");
  const [quality, setQuality] = useState("baixa");
  const [loadingResponse, setLoadingResponse] = useState(false);
  const [disabled, setDisabled] = useState(false);

  function handleExtensionCallback(optionSelected) {
    setExtension(optionSelected);
  }

  function handleQualityCallback(optionSelected) {
    setQuality(optionSelected);
  }

  async function handleClick() {
    setLoadingResponse(true);
    setDisabled(true);

    const data = {
      extension: extension,
      quality: quality,
    };

    await api
      .post(`download/${props.videoId}`, JSON.stringify(data), {
        headers: {
          accept: "application/json",
          "content-type": "application/json",
        },
      })
      .then((response) => {
        setLoadingResponse(false);
        console.log(response);
        const fileName =  `baixa-tube.${extension}`
        props.parentCallback("success");
        browserFileDownloader(response, fileName);
        toast.success('Vídeo baixado com sucesso!');
      })
      .catch((error) => {
        toast.error("Erro ao salvar vídeo!");
        props.parentCallback("error");
        setLoadingResponse(false);
        setDisabled(false);
      });
  }

  return (
    <>
      {props.onLoading ? (
        <div className="loading-container">
          <div className="loading-content">
            <ReactLoading type="bars" color="#E02626" />
          </div>
        </div>
      ) : (
        <div className="home-download-container">
          <div className="player-container">
            <ReactPlayer
              className="player-content"
              url={`https://www.youtube.com/watch?v=${props.videoId}`}
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
              disabled={disabled}
              label="Extensão"
              option1="mp4"
              option2="mp3"
              parentCallback={handleExtensionCallback}
            />
            <OptionsButton
              disabled={disabled}
              label="Qualidade"
              option1="baixa"
              option2="alta"
              parentCallback={handleQualityCallback}
            />
            {loadingResponse ? (
              <div className="ld-content">
                <ReactLoading
                  type="cylon"
                  color="#E02626"
                  height={"140%"}
                  width={"50%"}
                />
              </div>
            ) : (
              <button className="btn-download" onClick={() => handleClick()}>
                <GetAppIcon fontSize="large" />
                <h3>BAIXAR</h3>
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default DownloadOptions;
