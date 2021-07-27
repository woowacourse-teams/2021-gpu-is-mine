import { ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import Providers from "../providers/Providers";

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, "wrapper">) =>
  render(ui, { wrapper: Providers, ...options });

export * from "@testing-library/react";

export * from "@testing-library/user-event";

export { customRender as render };
