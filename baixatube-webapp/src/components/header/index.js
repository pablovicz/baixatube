import "./styles.css";

import GetAppIcon from "@material-ui/icons/GetApp";
import MoreVertIcon from "@material-ui/icons/MoreVert";

function Header() {
  return (
    <div className="header-container">
      <div className="header-content-container">
        <div className="logo-container">
          <div className="logo-icon">
            <GetAppIcon fontSize="large" />
          </div>
          <div className="logo-text">
            <h2 className="first">Baixa</h2>
            <h2 className="second">Tube</h2>
          </div>
        </div>
        <a
          className="more"
          target="_blank"
          href="https://www.google.com.br/"
          rel="noopener noreferrer"
        >
          <MoreVertIcon fontSize="large" className="more" />
        </a>
      </div>
    </div>
  );
}

export default Header;
