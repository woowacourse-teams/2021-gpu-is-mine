import { renderHook } from "@testing-library/react-hooks/dom";
import useBoolean from "./useBoolean";

describe("useBoolean", () => {
  test("initial value works", () => {
    [true, false].forEach((initialValue) => {
      const { result } = renderHook(() => useBoolean(initialValue));

      const [value] = result.current;

      expect(value).toBe(initialValue);
    });
  });
});
