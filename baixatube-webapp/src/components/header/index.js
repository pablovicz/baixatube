import "./styles.css";

import GetAppIcon from "@material-ui/icons/GetApp";
import MoreVertIcon from "@material-ui/icons/MoreVert";

function Header() {
  return (
    <div class="header-container">
      <div class="header-content-container">
        <div class="logo-container">
          <div class="logo-icon">
            <GetAppIcon fontSize="large" />
          </div>
          <div class="logo-text">
            <h2 class="first">Baixa</h2>
            <h2 class="second">Tube</h2>
          </div>
        </div>
        <a
          class="more"
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
