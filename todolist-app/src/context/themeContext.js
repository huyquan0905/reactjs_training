import React, { useState } from "react";
// Context has been created
const ThemeContext = React.createContext({
  toggle: false,
  toggleFunction: () => {},
  themeStyles: {},
});
// Provider
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
    <ThemeContext.Provider value={{ toggle, toggleFunction, themeStyles }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeProvider };
