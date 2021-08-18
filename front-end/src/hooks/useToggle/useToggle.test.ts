import { act, renderHook } from "@testing-library/react-hooks/dom";
import useToggle from "./useToggle";

describe("useToggle", () => {
  test("bool의 초기값은 initialValue이다", () => {
    [true, false].forEach((initialValue) => {
      const { result } = renderHook(() => useToggle(initialValue));

      expect(result.current[0]).toBe(initialValue);
    });
  });

  test("toggle을 인자 없이 호출하면 bool의 값이 toggle된다", () => {
    [true, false].forEach((initialValue) => {
      const { result } = renderHook(() => useToggle(initialValue));

      const [bool, toggle] = result.current;

      act(() => {
        toggle();
      });

      expect(result.current[0]).toBe(!bool);
    });
  });

  test("toggle에 인자를 전달하면 해당 인자가 bool에 할당된다", () => {
    const { result } = renderHook(() => useToggle(true));

    const [, toggle] = result.current;

    [true, false].forEach((force) => {
      act(() => {
        toggle(force);
      });

      expect(result.current[0]).toBe(force);
    });
  });

  test("toggle의 참조값은 항상 동일하다", () => {
    const { result } = renderHook(() => useToggle(true));

    const [, toggle] = result.current;

    [true, false].forEach((force) => {
      act(() => {
        toggle(force);
      });

      expect(result.current[1]).toBe(toggle);
    });
  });
});
