import { useCallback } from "react";
import useToggle from "../useToggle/useToggle";

const useBoolean = (initialValue: boolean) => {
  const [bool, toggle] = useToggle(initialValue);

  const on = useCallback(() => toggle(true), [toggle]);
  const off = useCallback(() => toggle(false), [toggle]);

  return [bool, on, off, toggle] as const;
};

export default useBoolean;
