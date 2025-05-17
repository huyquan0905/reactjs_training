import React, { Component } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import HomeMain from "./components/HomeMain/HomeMain";
import Footer from "./components/Footer/Footer";
import { ThemeProvider } from "./context/themeContext";
import { TaskProvider } from "./context/TaskContext";

class App extends Component {
  render() {
    return (
      <div className="App">
        <ThemeProvider>
          <Header />
          <TaskProvider>
            <HomeMain />
          </TaskProvider>
          <Footer />
        </ThemeProvider>
      </div>
    );
  }
}

export default App;
