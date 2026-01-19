import { useState, useEffect } from "react";

export const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(initialValue);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const item = window.localStorage.getItem(key);
      if (item) {
        setStoredValue(JSON.parse(item));
      }
    }
  }, [key]);

  const setValue = (value) => {
    try {
      setStoredValue(value);
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(value));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue];
};
