import React, { createContext, useState } from "react";

export const DarkModeStateContext = createContext(true);
export const DarkModeChangeContext = createContext(() => null);

const DarkModeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleDarkMode = () => {
    document.querySelector("html").classList.toggle("light");
    setIsDarkMode(prev => !prev);
  };

  return (
    <DarkModeStateContext.Provider value={isDarkMode}>
      <DarkModeChangeContext.Provider value={toggleDarkMode}>
        {children}
      </DarkModeChangeContext.Provider>
    </DarkModeStateContext.Provider>
  );
};

export default DarkModeProvider;
