import React, { createContext, useEffect, useState } from "react";

export const DarkModeStateContext = createContext(true);
export const DarkModeChangeContext = createContext(() => null);

const DarkModeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  useEffect(() => {
    document.querySelector("html").classList.toggle("light");
  }, [isDarkMode]);

  useEffect(() => {
    document.querySelector("html").classList.remove("light");
  }, []);

  return (
    <DarkModeStateContext.Provider value={isDarkMode}>
      <DarkModeChangeContext.Provider value={toggleDarkMode}>
        {children}
      </DarkModeChangeContext.Provider>
    </DarkModeStateContext.Provider>
  );
};

export default DarkModeProvider;
