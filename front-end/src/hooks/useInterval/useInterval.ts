import { useEffect, useRef } from "react";

const useInterval = (callback: (...args: unknown[]) => unknown, delay: number) => {
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const timeId = setInterval(() => savedCallback.current(), delay);

    return () => clearInterval(timeId);
  }, [delay]);
};

export default useInterval;
