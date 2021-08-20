import "./styles.css";

import {AiFillGithub, AiOutlineCopyrightCircle} from "react-icons/ai";

function Footer() {
  return (
    <div className="footer-container">
      <div className="footer-content">
        <div className="cp-container">
          <AiOutlineCopyrightCircle size={30} className="copyright-icon"/>
          <h3>BaixaTube, Baixador de Vídeos Online</h3>
        </div>
        <a href="https://github.com/pablovicz/baixatube" target="_blank" rel="noopener noreferrer" >
            <AiFillGithub size={30} className="git-icon"/>
        </a>
      </div>
    </div>
  );
}

export default Footer;
