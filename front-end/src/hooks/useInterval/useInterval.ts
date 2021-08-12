import { useEffect, useRef } from "react";

const useInterval = (callback: (...args: unknown[]) => unknown, delay: number | null) => {
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay == null) {
      return;
    }

    const timeId = setInterval(() => savedCallback.current(), delay);

    // eslint-disable-next-line consistent-return
    return () => clearInterval(timeId);
  }, [delay]);
};

export default useInterval;
