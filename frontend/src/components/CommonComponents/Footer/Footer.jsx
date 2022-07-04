import React from "react";
import { Link } from "react-router-dom";

import GitHub from "../../../Iconos/GitHub";
function Footer() {
  return (
    <div className="footer">

      
      <a className="github" target="_blank" href="https://github.com/GRUPO12PF/E-SOCIAL">  
          <GitHub />
      </a>
      <div className="leyenda">
          &copy;{new Date().getFullYear()} E-SOCIAL INC | Todos los derechos reservados | {<Link to="/about" className="conocenos"> Conócenos </Link>}
      </div>
    </div>
  );
}

export default Footer;
