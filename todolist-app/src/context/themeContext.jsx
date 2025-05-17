import React, { Component } from "react";

const ThemeContext = React.createContext({
  toggle: false,
  toggleFunction: () => {},
  themeStyles: {},
});

class ThemeProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: false,
    };
  }

  toggleFunction = () => {
    this.setState((prevState) => ({ toggle: !prevState.toggle }));
  };

  render() {
    const { toggle } = this.state;
    const themeStyles = {
      backgroundColor: toggle ? "black" : "white",
      color: toggle ? "white" : "black",
    };

    return (
      <ThemeContext.Provider
        value={{
          toggle: toggle,
          toggleFunction: this.toggleFunction,
          themeStyles: themeStyles,
        }}
      >
        {this.props.children}
      </ThemeContext.Provider>
    );
  }
}

export { ThemeContext, ThemeProvider };
