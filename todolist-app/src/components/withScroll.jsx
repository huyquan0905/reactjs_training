import React, { useEffect, useCallback } from "react";

const withScroll = (WrappedComponent) => {
  return (props) => {
    const { loadMore } = props;
    
    const handleScroll = useCallback(() => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.offsetHeight;

      if (scrollTop + windowHeight >= docHeight - 100) {
        loadMore?.();
      }
    }, [loadMore]);

    useEffect(() => {
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, [handleScroll]);

    return <WrappedComponent {...props} />;
  };
};

export default withScroll;
