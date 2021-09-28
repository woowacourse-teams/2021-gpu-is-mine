import { ReactNode } from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "../components";
import { GlobalStyle, ThemeProvider } from "../styles";
import { store } from "../app/store";

interface ProvidersProps {
  children?: ReactNode;
}

const Providers = ({ children }: ProvidersProps): JSX.Element => (
  <Provider store={store}>
    <ThemeProvider>
      <GlobalStyle />
      <AuthProvider>
        <Router>{children}</Router>
      </AuthProvider>
    </ThemeProvider>
  </Provider>
);

export default Providers;
