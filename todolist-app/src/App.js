import React from "react";
import "./App.css";
import Header from "./components/Header/Header";
import HomeMain from "./components/HomeMain/HomeMain";
import Footer from "./components/Footer/Footer";
import { ThemeProvider } from "./context/themeContext";
import { LoadMoreProvider } from "./context/loadMoreContext";

const App = () => {
  return (
    <div className="App">
      <ThemeProvider>
        <Header />
        <LoadMoreProvider>
          <HomeMain />
        </LoadMoreProvider>
        <Footer />
      </ThemeProvider>
    </div>
  );
};

export default App;
