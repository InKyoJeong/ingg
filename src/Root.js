import React from "react";
import DarkModeProvider from "./context/DarkModeProvider";

const RootElement = ({ children }) => {
  return <DarkModeProvider>{children}</DarkModeProvider>;
};

export default RootElement;
