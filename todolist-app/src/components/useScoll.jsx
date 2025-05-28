import { useEffect, useCallback } from "react";

const useScroll = (callback, offset = 100) => {
  const handleScroll = useCallback(() => {
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const docHeight = document.documentElement.offsetHeight;

    if (scrollTop + windowHeight >= docHeight - offset) {
      callback?.();
    }
  }, [callback, offset]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);
};

export default useScroll;
