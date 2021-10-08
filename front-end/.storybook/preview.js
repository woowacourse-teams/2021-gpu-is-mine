import React from "react";
import { Provider } from "react-redux";
import { MemoryRouter as Router } from "react-router-dom";
import { GlobalStyle, ThemeProvider } from "../src/styles";
import { configureStore } from "@reduxjs/toolkit";
import { SLICE_NAME } from "../src/constants";
import authReducer from "../src/features/member/authSlice";
import { succeedAuthState } from "../src/__fixtures__";

export const globalTypes = {
  store: {
    name: "store",
    description: "Redux mock store",
    defaultValue: configureStore({
      reducer: { [SLICE_NAME.AUTH]: authReducer },
      preloadedState: { [SLICE_NAME.AUTH]: succeedAuthState },
    }),
  },
};

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
  (Story, context) => (
    <Provider store={context.globals.store}>
      <ThemeProvider>
        <GlobalStyle />
        <Router>
          <Story />
        </Router>
      </ThemeProvider>
    </Provider>
  ),
];
