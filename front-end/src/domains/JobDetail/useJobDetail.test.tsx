import { renderHook, act } from "@testing-library/react-hooks/dom";
import { useGoToPage } from "./useJobDetail";

const mockHistory = jest.fn();

jest.mock("react-router-dom", () => ({
  useHistory: () => ({ go: mockHistory }),
}));

describe("useGoToPage", () => {
  test("useGoToPage(n)을 호출하면 history.go(n)이 실행하는 함수가 반환된다", () => {
    [-3, -1, 0, 3, 10].forEach((n) => {
      const { result } = renderHook(() => useGoToPage(n));

      act(() => result.current());

      expect(mockHistory).toHaveBeenCalledWith(n);
    });
  });
});
