import React from "react";
import Providers from "../src/providers/Providers";

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
    <Providers>
      <Story />
    </Providers>
  ),
];
