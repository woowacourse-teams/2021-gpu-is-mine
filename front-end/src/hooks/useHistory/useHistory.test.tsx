import { renderHook, act } from "@testing-library/react-hooks/dom";
import { pathList, useGoToPage, useMoveToPage, useParseParams } from "./useHistory";

const mockGo = jest.fn();

const mockPush = jest.fn();

const mockUseParams = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useHistory: () => ({ go: mockGo, push: mockPush }),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  useParams: () => mockUseParams(),
}));

describe("useGoToPage", () => {
  test("useGoToPage(n)을 호출하면 history.go(n)이 실행하는 함수가 반환된다", () => {
    [-3, -1, 0, 3, 10].forEach((n) => {
      const { result } = renderHook(() => useGoToPage(n));

      act(() => result.current());

      expect(mockGo).toHaveBeenCalledWith(n);
    });
  });
});

describe("useMoveToPage", () => {
  test("pathlist에 존재하지 않는 route를 인자로 전달하면 에러가 발생한다", () => {
    ["/", "abcd", "", "/job/vie", "/member/signp"].forEach((route) => {
      const { result } = renderHook(() => useMoveToPage(route));

      expect(result.error).toBeDefined();
      expect(result.error?.message).toMatch(new RegExp(route));
    });
  });

  test("pathlist에 존재하는 route를 인자로 전달하면 history.push함수를 route 인자를 전달하여 호출한다", () => {
    pathList.forEach((route) => {
      const { result } = renderHook(() => useMoveToPage(route));

      result.current();

      expect(mockPush).toHaveBeenCalledWith(route);
    });
  });
});

describe("useParseParams", () => {
  test("인자로 전달한 key에 해당하는 param이 존재하지 않으면 예외가 발생한다", () => {
    const key = "serverId";

    mockUseParams.mockReturnValue({});

    const { result } = renderHook(() => useParseParams(key));

    expect(result.error).toBeDefined();
  });

  test("인자로 전달한 key에 해당하는 param이 존재하면 string 타입의 param을 반환한다", () => {
    const key = "serverId";
    const value = "3";

    mockUseParams.mockReturnValue({ [key]: value });

    const { result } = renderHook(() => useParseParams(key));

    expect(result.current).toBe(value);
  });
});
