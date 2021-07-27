import { ReactNode } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { GlobalStyle, ThemeProvider } from "../styles";

interface ProvidersProps {
  children?: ReactNode;
}

const Providers = ({ children }: ProvidersProps): JSX.Element => (
  <ThemeProvider>
    <GlobalStyle />
    <Router>{children}</Router>
  </ThemeProvider>
);

export default Providers;
