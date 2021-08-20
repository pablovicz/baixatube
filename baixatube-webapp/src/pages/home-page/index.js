import "./home-page.css";

import {useState} from "react";

import PlayArrowIcon from '@material-ui/icons/PlayArrow';

function HomePage() {

  const [url, setUrl] = useState('');


  function handleSubmit(){
    console.log(url);
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
            onChange={event => setUrl(event.target.value)}
          />
          <button type="button" className="play-button" onClick={() => handleSubmit()}>
            <PlayArrowIcon fontSize="large"/>
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
