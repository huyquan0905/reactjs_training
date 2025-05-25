// context/TaskContext.js
import React, { createContext, useState, useCallback } from "react";

export const LoadMoreContext = createContext();

export const LoadMoreProvider = ({ children }) => {
  const [displayTask, setDisplayTask] = useState(10);

  const loadMore = useCallback(() => {
    debugger;
    setDisplayTask((prev) => prev + 5);
  }, []);

  return (
    <LoadMoreContext.Provider value={{ loadMore, displayTask }}>
      {children}
    </LoadMoreContext.Provider>
  );
};
