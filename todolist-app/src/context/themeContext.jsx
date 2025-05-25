import React, { createContext, useState } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [toggle, setToggle] = useState(false);

  const toggleFunction = () => {
    setToggle((prev) => !prev);
  };

  const themeStyles = {
    backgroundColor: toggle ? "black" : "white",
    color: toggle ? "white" : "black",
  };

  return (
    <ThemeContext.Provider
      value={{
        toggleFunction,
        themeStyles,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
