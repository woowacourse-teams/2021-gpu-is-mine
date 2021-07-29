import { useCallback, useState } from "react";

const useBoolean = (initialValue: boolean) => {
  const [bool, setBool] = useState(initialValue);

  const on = useCallback(() => setBool(true), []);
  const off = useCallback(() => setBool(false), []);
  const toggle = useCallback(() => setBool((b) => !b), []);

  return [bool, on, off, toggle] as const;
};

export default useBoolean;
