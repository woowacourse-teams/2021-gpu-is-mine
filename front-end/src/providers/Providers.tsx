import { FC } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { GlobalStyle, ThemeProvider } from "../styles";

const Providers: FC = ({ children }) => (
  <ThemeProvider>
    <GlobalStyle />
    <Router>{children}</Router>
  </ThemeProvider>
);

export default Providers;
