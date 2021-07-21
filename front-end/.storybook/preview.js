import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import GlobalStyle from "../src/styles/GlobalStyle";
import ThemeProvider from "../src/styles/ThemeProvider";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
export const decorators = [
  (Story) => (
    <ThemeProvider>
      <GlobalStyle />
      <Router>
        <Story />
      </Router>
    </ThemeProvider>
  ),
];
