import { render, screen, userEvent } from "../../__test__/test-utils";
import JobDetail from "./JobDetail";
import { JobResponseMock } from "../../__fixtures__";
import { generateStatusBoolean } from "../../hooks/useFetch/useFetch";
import type { APICallStatus } from "../../types";

const mockGoBack = jest.fn();

const mockUseJobDetail = jest.fn();

jest.mock("./useJobDetail", () => ({
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  useJobDetail: () => mockUseJobDetail(),
  useJobId: () => 1,
}));

jest.mock("../../hooks/useHistory/useHistory", () => ({
  useGoToPage: () => mockGoBack,
}));

describe("JobDetail", () => {
  const mock = ({ detail = JobResponseMock, status = "succeed" } = {}) => {
    mockUseJobDetail.mockReturnValue({
      detail,
      status,
      ...generateStatusBoolean(status as APICallStatus),
    });
  };

  test("status가 loading 일 때 Loading 스피너가 표시된다", async () => {
    mock({ status: "loading" });

    render(<JobDetail labId={1} />);

    screen.debug();
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  test("status가 failed 일 때 dialog가 표시된다. 확인 버튼을 클릭하면 이전 페이지로 이동한다", () => {
    mock({ status: "failed" });

    render(<JobDetail labId={1} />);

    expect(screen.getByRole("dialog")).toBeInTheDocument();

    userEvent.click(screen.getByRole("button"));

    expect(mockGoBack).toHaveBeenCalledTimes(1);
  });
});
