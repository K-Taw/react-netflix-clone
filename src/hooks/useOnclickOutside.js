import React from "react";
import { useEffect } from "react";

const useOnclickOutside = (ref, handler) => {
  useEffect(() => {
    const listener = (event) => {
      console.log("ref, cruurent");

      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.addEventListener("mousedown", listener);
      document.addEventListener("touchstart", listener);
    };
  }, []);
};

export default useOnclickOutside;
