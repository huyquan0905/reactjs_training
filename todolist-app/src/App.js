import React, { Component } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import InputList from "./components/InputList/InputList";
import Footer from "./components/Footer/Footer";
import { ThemeProvider } from "./context/themeContext";

class App extends Component {
  render() {
    return (
      <div className="App">
        <ThemeProvider>
          <Header />
          <InputList />
          <Footer />
        </ThemeProvider>
      </div>
    );
  }
}

export default App;
