import React, { Component } from "react";
import { TaskContext } from "../context/TaskContext";

const withScroll = (WrappedComponent) => {
  return class extends Component {
    static contextType = TaskContext;

    componentDidMount() {
      window.addEventListener("scroll", this.handleScroll);
    }

    componentWillUnmount() {
      window.removeEventListener("scroll", this.handleScroll);
    }

    handleScroll = () => {
      const { loadMore } = this.context;
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.offsetHeight;

      if (scrollTop + windowHeight >= docHeight - 100) {
        loadMore();
      }
    };

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
};

export default withScroll;
