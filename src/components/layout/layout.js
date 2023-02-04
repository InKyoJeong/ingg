import React, { useContext } from "react";
import { Link } from "gatsby";

import Top from "../top/top";
import Switch from "../switch/switch";
import "./layout.scss";
import { DarkModeStateContext } from "../../context/DarkModeProvider";

const Layout = ({ location, title, children }) => {
  const isDarkMode = useContext(DarkModeStateContext);
  const rootPath = `${__PATH_PREFIX__}/`;
  const isRootPath = location.pathname === rootPath;

  return (
    <>
      <Top />
      <div
        className={`global-wrapper ${isDarkMode ? "dark" : "light"}`}
        data-is-root-path={isRootPath}
      >
        <Switch />
        <header className="global-header">
          <h1 className="main-heading">
            <Link to="/">{title}</Link>
          </h1>
        </header>
        <main>{children}</main>
        <footer className="global-footer">
          <span>© {new Date().getFullYear()} </span>
          <strong>INKYO JEONG</strong>. All rights reserved.
        </footer>
      </div>
    </>
  );
};

export default Layout;
