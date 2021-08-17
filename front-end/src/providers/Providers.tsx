import { ReactNode } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "../components";
import { GlobalStyle, ThemeProvider } from "../styles";

interface ProvidersProps {
  children?: ReactNode;
}

const Providers = ({ children }: ProvidersProps): JSX.Element => (
  <ThemeProvider>
    <GlobalStyle />
    <AuthProvider>
      <Router>{children}</Router>
    </AuthProvider>
  </ThemeProvider>
);

export default Providers;
