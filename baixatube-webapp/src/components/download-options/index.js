import "./styles.css";
import OptionsButton from "../options-button";

import ReactPlayer from "react-player";
import GetAppIcon from "@material-ui/icons/GetApp";


function DownloadOptions(props) {

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
        <OptionsButton label="Extensão" option1="mp4" option2="mp3" />
        <OptionsButton label="Qualidade" option1="baixa" option2="alta" />
        <button className="btn-download">
          <GetAppIcon fontSize="large" />
          <h3>BAIXAR</h3>
        </button>
      </div>
    </div>
  );
}

export default DownloadOptions;
