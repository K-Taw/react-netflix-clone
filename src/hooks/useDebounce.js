import React, { useState, useEffect } from "react";

export const useDebounce = (value, delay) => {
  // State and setters for deounce value
  const [debounceValue, setdebounceValue] = useState(value);

  useEffect(
    () => {
      // Update debounced value after delay
      const handler = setTimeout(() => {
        setdebounceValue(value);
      }, delay);

      // Cancel the timeout if value changes (also on delay change or unmount)
      // This is how we prevent debounced value from updating if value is changed...
      //... within the delay period.
      return () => {
        clearTimeout(handler);
      };
    },
    [value, delay] // only re-call effect if value or delay changes
  );

  return debounceValue;
};
