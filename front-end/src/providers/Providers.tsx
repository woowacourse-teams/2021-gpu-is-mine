import { ReactNode } from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { GlobalStyle, ThemeProvider } from "../styles";
import { store } from "../app/store";

interface ProvidersProps {
  children?: ReactNode;
}

const Providers = ({ children }: ProvidersProps): JSX.Element => (
  <Provider store={store}>
    <ThemeProvider>
      <GlobalStyle />
      <Router>{children}</Router>
    </ThemeProvider>
  </Provider>
);

export default Providers;
