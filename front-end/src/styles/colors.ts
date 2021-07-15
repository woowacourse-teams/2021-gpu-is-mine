import { css } from "styled-components";

const colors = css`
  :root {
    --text-dark: #111111;
    --text-light: #ffffff;

    --primary-900: #222e3d;
    --primary-800: #344355;
    --primary-700: #43556b;
    --primary-600: #536881;
    --primary-500: #617792;
    --primary-400: #788ba4;
    --primary-300: #8f9fb6;
    --primary-200: #adbbcd;
    --primary-100: #cad6e5;
    --primary-50: #e9eefa;

    --secondary-900: #d25d22;
    --secondary-800: #de7326;
    --secondary-700: #e58129;
    --secondary-600: #ec902d;
    --secondary-500: #f09b30;
    --secondary-400: #f3a941;
    --secondary-300: #f5b85e;
    --secondary-200: #f7cc8a;
    --secondary-100: #fae0b8;
    --secondary-50: #fdf3e2;

    --surface: #ffffff;
    --background: #ffffff;
    --error: #b00020;
    --disabled: rgba(34, 46, 61, 0.3);

    --on-primary-900: var(--text-light);
    --on-primary-800: var(--text-light);
    --on-primary-700: var(--text-light);
    --on-primary-600: var(--text-light);
    --on-primary-500: var(--text-light);
    --on-primary-400: var(--text-dark);
    --on-primary-300: var(--text-dark);
    --on-primary-200: var(--text-dark);
    --on-primary-100: var(--text-dark);
    --on-primary-50: var(--text-dark);

    --on-secondary-900: var(--text-light);
    --on-secondary-800: var(--text-light);
    --on-secondary-700: var(--text-light);
    --on-secondary-600: var(--text-light);
    --on-secondary-500: var(--text-dark);
    --on-secondary-400: var(--text-dark);
    --on-secondary-300: var(--text-dark);
    --on-secondary-200: var(--text-dark);
    --on-secondary-100: var(--text-dark);
    --on-secondary-50: var(--text-dark);

    --on-surface: var(--text-dark);
    --on-background: var(--text-dark);
    --on-error: var(--text-light);
    --on-disabled: var(--text-light);
  }
`;

export default colors;
