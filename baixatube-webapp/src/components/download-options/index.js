import "./styles.css";
import OptionsButton from "../options-button";
import api from "../../service/api.js";

import ReactPlayer from "react-player";
import GetAppIcon from "@material-ui/icons/GetApp";
import ReactLoading from "react-loading";
import { toast } from 'react-toastify';

import { useState } from "react";

function DownloadOptions(props) {
  const [extension, setExtension] = useState("mp4");
  const [quality, setQuality] = useState("baixa");
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);

  function handleExtensionCallback(optionSelected) {
    setExtension(optionSelected);
  }

  function handleQualityCallback(optionSelected) {
    setQuality(optionSelected);
  }

  function saveAs(blob, fileName) {
    var url = window.URL.createObjectURL(blob);

    var anchorElem = document.createElement("a");
    anchorElem.style = "display: none";
    anchorElem.href = url;
    anchorElem.download = fileName;

    document.body.appendChild(anchorElem);
    anchorElem.click();

    document.body.removeChild(anchorElem);
    setTimeout(function() {
        window.URL.revokeObjectURL(url);
    }, 1000);
}

  async function handleClick() {

    setLoading(true);
    setDisabled(true);

    const data = {
      url: props.url,
      extension: extension,
      quality: quality,
    };

    console.log(data);
    console.log('sending request');

    await api
      .post("download/", JSON.stringify(data), {
        headers: {
          accept: "application/json",
          "content-type": "application/json",
        },
      })
      .catch(error => {
        toast.error('Erro ao salvar vídeo!')
        props.parentCallback('error');
      })
      .then((response) => {
        setLoading(false);
        props.parentCallback('success');
        var byteCharacters = atob(response.data);
        var byteNumbers = new Array(byteCharacters.length);
        for (var i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        var byteArray = new Uint8Array(byteNumbers);
        var blob1 = new Blob([byteArray], {type: "application/octet-stream"});

        var fileName = response.headers.file_name;
        saveAs(blob1, fileName);
      });
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
        
        {loading ? (
          <div className='ld-content'>
            <ReactLoading
              type="cylon"
              color="#E02626"
              height={'140%'} 
              width={'50%'}
            />
          </div>
        ) : (
          <button 
            className="btn-download" 
            onClick={() => handleClick()}
          >
              <GetAppIcon fontSize="large" />
              <h3>BAIXAR</h3>
          </button>
        )
        }
      </div>
    </div>
  );
}

export default DownloadOptions;
