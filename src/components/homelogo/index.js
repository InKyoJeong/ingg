import React from "react";
import { Link } from "gatsby";
import homelogo from "../../../content/assets/homelogo.svg";
import "./styles.scss";

const HomeLogo = () => {
  return (
    <div className="cover_logo">
      <Link to={`/`}>
        <img src={homelogo} alt="Logo" />
      </Link>
    </div>
  );
};

export default HomeLogo;
