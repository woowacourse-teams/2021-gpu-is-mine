import { ComponentType, ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { configureStore, EnhancedStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import signupReducer from "../features/member/signupSlice";
import authReducer from "../features/member/authSlice";
import { ThemeProvider } from "../styles";
import { ToastProvider } from "../components";

type CustomRender = (
  ui: ReactElement,
  {
    store,
    initialEntries,
    ...renderOptions
  }?: {
    store?: EnhancedStore;
    initialEntries?: string[];
    renderOptions?: Omit<RenderOptions, "wrapper">;
  }
) => ReturnType<typeof render>;

const customRender: CustomRender = (
  ui,
  {
    store = configureStore({
      reducer: { auth: authReducer, signup: signupReducer },
    }),
    initialEntries = ["/"],
    ...renderOptions
  } = {}
) => {
  const Wrapper: ComponentType = ({ children }) => (
    <Provider store={store}>
      <ThemeProvider>
        <ToastProvider>
          <MemoryRouter initialEntries={initialEntries}>{children}</MemoryRouter>
        </ToastProvider>
      </ThemeProvider>
    </Provider>
  );

  return render(ui, { wrapper: Wrapper, ...renderOptions });
};

export * from "@testing-library/react";

export * from "@testing-library/user-event";

export { default as userEvent } from "@testing-library/user-event";

export { customRender as render };
