import { createBreakpoint, createMap } from "styled-components-breakpoint";

const viewports = {
  tablet: 640, // 40em
  laptop: 1024, // 64em
  desktop: 1280, // 80em
};

export const breakpoint = createBreakpoint(viewports);

export const map = createMap(viewports);
