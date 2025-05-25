import React, { createContext, useState } from "react";

const ThemeContext = createContext({
  toggleFunction: () => {},
  themeStyles: {},
});

const ThemeProvider = ({ children }) => {
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

export { ThemeContext, ThemeProvider };
