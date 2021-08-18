import { only, up } from "styled-breakpoints";
import { useBreakpoint } from "styled-breakpoints/react-styled";

/**
 * 현재 뷰포트를 나타내는 boolean flag를 반환한다
 */
const useBreakpoints = () => {
  const isMobile = useBreakpoint(only("mobile")) ?? false;
  const isTablet = useBreakpoint(only("tablet")) ?? false;
  const isLaptop = useBreakpoint(up("laptop")) ?? false;

  return {
    isMobile,
    isTablet,
    isLaptop,
  };
};

export default useBreakpoints;
