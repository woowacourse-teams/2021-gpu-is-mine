import { renderHook } from "@testing-library/react-hooks/dom";
import useMyInfo from "./useMyInfo";
import { membersMeResponse } from "../../__fixtures__";

const mockUseAuth = jest.fn();

// eslint-disable-next-line @typescript-eslint/no-unsafe-return
jest.mock("./useAuth", () => ({ useAuth: () => mockUseAuth() }));

describe("useMyInfo", () => {
  test("myInfo가 존재하지 않으면 예외가 발생한다", () => {
    mockUseAuth.mockReturnValue({});
    const { result } = renderHook(() => useMyInfo());

    expect(result.error).toBeDefined();
  });

  test("반환값의 memberId, labId, labName를 검증한다 ", () => {
    mockUseAuth.mockReturnValue({ myInfo: membersMeResponse });
    const { result } = renderHook(() => useMyInfo());

    const { memberId, labId, labName, ...myInfo } = result.current;

    expect(memberId).toBe(myInfo.id);
    expect(labId).toBe(myInfo.labResponse.id);
    expect(labName).toBe(myInfo.labResponse.name);
  });
});
