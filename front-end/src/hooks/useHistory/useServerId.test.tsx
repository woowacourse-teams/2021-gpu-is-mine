import type { ReactNode } from "react";
import { renderHook } from "@testing-library/react-hooks/dom";
import { MemoryRouter, Route } from "react-router-dom";
import { useServerId } from "./useHistory";

const Wrapper = ({ path, children }: { path: string; children?: ReactNode }) => (
  <MemoryRouter initialEntries={[path]}>
    <Route exact strict path={["/:serverId", "*"]}>
      {children}
    </Route>
  </MemoryRouter>
);

describe("useServerId", () => {
  test("serverId Params가 path와 일치하는 경우, number로 변환하여 반환한다. ", () => {
    const serverId = 77;
    const { result } = renderHook(() => useServerId(), {
      initialProps: { path: `/${serverId}` },
      wrapper: Wrapper,
    });

    expect(result.current).toBe(serverId);
  });

  test("serverId Params가 path와 일치하지 않는 경우, 예외가 발생한다. ", () => {
    ["", "/abc", "path/to/test"].forEach((path) => {
      const { result } = renderHook(() => useServerId(), {
        initialProps: { path },
        wrapper: Wrapper,
      });

      expect(result.error).not.toBeUndefined();
    });
  });
});
