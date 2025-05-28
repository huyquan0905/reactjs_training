import React from "react";
import "./App.css";
import Header from "./components/Header/Header";
import HomeMain from "./components/HomeMain/HomeMain";
import Footer from "./components/Footer/Footer";
import { ThemeProvider } from "./context/themeContext";

const App = () => {
  return (
    <div className="App">
      <ThemeProvider>
        <Header />
        <HomeMain />
        <Footer />
      </ThemeProvider>
    </div>
  );
};

export default App;
