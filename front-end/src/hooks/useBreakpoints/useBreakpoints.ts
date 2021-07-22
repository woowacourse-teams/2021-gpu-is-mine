import { only, up } from "styled-breakpoints";
import { useBreakpoint } from "styled-breakpoints/react-styled";

const useBreakpoints = () => {
  const isMobile = useBreakpoint(only("mobile"));
  const isTablet = useBreakpoint(only("tablet"));
  const isLaptop = useBreakpoint(up("laptop"));

  return {
    isMobile,
    isTablet,
    isLaptop,
  };
};

export default useBreakpoints;
