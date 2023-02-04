import "@fontsource/montserrat/variable.css";
import "@fontsource/merriweather";
import "./src/styles/reset.scss";
import "./src/styles/global.scss";
import "prismjs/themes/prism.css"; // Highlighting for code blocks

import React from "react";
import RootElement from "./src/Root";

export const wrapRootElement = ({ element }) => {
  return <RootElement>{element}</RootElement>;
};
