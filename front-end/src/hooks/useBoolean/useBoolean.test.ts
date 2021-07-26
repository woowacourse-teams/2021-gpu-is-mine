import { renderHook, act } from "@testing-library/react-hooks/dom";
import useBoolean from "./useBoolean";

describe("useBoolean", () => {
  test("parameter로 넘긴 initialValue가 반환값 배열의 첫번째 값이다", () => {
    [true, false].forEach((initialValue) => {
      const { result } = renderHook(() => useBoolean(initialValue));

      const [value] = result.current;

      expect(value).toBe(initialValue);
    });
  });

  test("반환값 배열의 두번째 값을 실행하면 state를 true로 만든다", () => {
    const { result } = renderHook(() => useBoolean(false));

    act(result.current[1]);

    const [value] = result.current;

    expect(value).toBe(true);
  });

  test("반환값 배열의 세번째 값을 실행하면 state를 false로 만든다", () => {
    const { result } = renderHook(() => useBoolean(false));

    act(result.current[2]);

    const [value] = result.current;

    expect(value).toBe(false);
  });

  test("반환값 배열의 네번째 값을 실행하면 기존의 state를 toggle한다", () => {
    let [prev, curr] = [false, true];
    const { result } = renderHook(() => useBoolean(curr));

    act(() => {
      result.current[3]();
      prev = curr;
    });

    [curr] = result.current;

    expect(curr).toBe(!prev);

    act(() => {
      result.current[3]();
      prev = curr;
    });

    [curr] = result.current;

    expect(curr).toBe(!prev);
  });
});
