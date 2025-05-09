import React, { Component } from "react";
import "./PagingTask.css";

class PagingTask extends Component {
  render() {
    const { totalPages, currentPage, changePage } = this.props;
    if (totalPages <= 1) return null;

    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }

    return (
      <div className="paging-container">
        {pages.map((page) => (
          <button
            key={page}
            className={`paging-btn ${currentPage === page ? "active" : ""}`}
            onClick={() => changePage(page)}
          >
            {page}
          </button>
        ))}
      </div>
    );
  }
}

export default PagingTask;
