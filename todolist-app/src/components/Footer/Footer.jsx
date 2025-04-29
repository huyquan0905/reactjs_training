import React, { Component } from "react";
import "./footer.css";

class Footer extends Component {
  render() {
    return (
      <div>
        <p className="footer-text mt">Double-click to edit a todo</p>
        <p className="footer-text">Created by the TodoMVC Team</p>
        <p className="footer-text">Part of TodoMVC</p>
      </div>
    );
  }
}

export default Footer;
