import { useState } from "react";

const useBoolean = (initialValue: boolean) => {
  const [bool, setBool] = useState(initialValue);

  const on = () => setBool(true);
  const off = () => setBool(false);
  const toggle = () => setBool(!bool);

  return [bool, on, off, toggle] as const;
};

export default useBoolean;
