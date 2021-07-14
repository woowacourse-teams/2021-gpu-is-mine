import { ThemeProvider as DefaultThemeProvider } from "styled-components";

const theme = {
  breakpoints: {
    mobile: "0",
    tablet: "640px", // 40em
    laptop: "1024px", // 64em
    desktop: "1280px", // 80em
  },
} as const;

interface ThemeProviderProps {
  children: React.ReactNode;
}

const ThemeProvider = ({ children }: ThemeProviderProps) => (
  <DefaultThemeProvider theme={theme}>{children}</DefaultThemeProvider>
);

export default ThemeProvider;
