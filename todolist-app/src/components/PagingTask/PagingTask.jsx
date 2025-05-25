import React from "react";
import "./PagingTask.css";

const PagingTask = ({ totalPages, currentPage, changePage }) => {
  // console.log("PagingTask", totalPages, currentPage);

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
};

export default PagingTask;
