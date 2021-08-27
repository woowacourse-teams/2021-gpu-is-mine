import { useCallback, useState } from "react";

const useToggle = (initialValue: boolean) => {
  const [bool, setBool] = useState(initialValue);

  const toggle = useCallback((force?: boolean) => setBool((prev) => force ?? !prev), []);

  return [bool, toggle] as const;
};

export default useToggle;
