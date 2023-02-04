import React from "react";
import { Link } from "gatsby";

import "./homelogo.scss";

const HomeLogo = () => {
  return (
    <div className="home-logo">
      <Link to={`/`}>
        <img
          src={
            "https://user-images.githubusercontent.com/48676844/216779300-9cb56bd2-ec6d-46e2-8e31-543bdbc821d6.svg"
          }
          alt="Logo"
        />
      </Link>
    </div>
  );
};

export default HomeLogo;
