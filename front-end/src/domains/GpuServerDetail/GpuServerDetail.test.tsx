import { ReactNode } from "react";
import { MemoryRouter, Route } from "react-router-dom";
import { renderHook } from "@testing-library/react-hooks/dom";
import { useServerId } from "./GpuServerDetail";

const Wrapper = ({ path, children }: { path: string; children?: ReactNode }) => (
  <MemoryRouter initialEntries={[path]}>
    <Route exact path="/:serverId">
      {children}
    </Route>
  </MemoryRouter>
);

describe("useServerId", () => {
  test("serverId Params가 path와 일치하는 경우, number로 변환하여 반환한다. ", () => {
    const serverId = 35;
    const { result } = renderHook(() => useServerId(), {
      initialProps: { path: `/${serverId}` },
      wrapper: Wrapper,
    });

    expect(result.current).toBe(serverId);
  });
});
