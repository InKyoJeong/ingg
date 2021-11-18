import React from "react";

import "./styles.scss";

export const Footer = () => (
  <footer className="footer">
    © {new Date().getFullYear()} <strong>INKYO JEONG</strong>. All rights
    reserved.
  </footer>
);
