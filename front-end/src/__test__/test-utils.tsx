import { ComponentType, ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { configureStore, EnhancedStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import signupReducer from "../features/member/signupSlice";
import authReducer from "../features/member/authSlice";
import { ThemeProvider } from "../styles";

type CustomRender = (
  ui: ReactElement,
  {
    store,
    ...renderOptions
  }?: {
    store: EnhancedStore;
    renderOptions?: Omit<RenderOptions, "wrapper">;
  }
) => ReturnType<typeof render>;

const customRender: CustomRender = (
  ui,
  { store, ...renderOptions } = {
    store: configureStore({
      reducer: { auth: authReducer, signup: signupReducer },
    }),
  }
) => {
  const Wrapper: ComponentType = ({ children }) => (
    <Provider store={store}>
      <ThemeProvider>
        <MemoryRouter>{children}</MemoryRouter>
      </ThemeProvider>
    </Provider>
  );

  return render(ui, { wrapper: Wrapper, ...renderOptions });
};

export * from "@testing-library/react";

export * from "@testing-library/user-event";

export { default as userEvent } from "@testing-library/user-event";

export { customRender as render };
