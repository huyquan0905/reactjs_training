import React, { Component } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import InputList from "./components/InputList/InputList";
import Footer from "./components/Footer/Footer";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <InputList />
        <Footer />
      </div>
    );
  }
}

export default App;
