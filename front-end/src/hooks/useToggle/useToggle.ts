import { useState } from "react";

const useToggle = (initialValue: boolean) => {
  const [bool, setBool] = useState(initialValue);

  const toggle = () => setBool(!bool);

  return [bool, toggle] as const;
};

export default useToggle;
