import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import JobDetail from "./JobDetail";
import { JobResponseMock } from "../../__fixtures__";

const mockGoBack = jest.fn();

const mockUseJobDetail = jest.fn();

jest.mock("./useJobDetail", () => ({
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  useJobDetail: () => mockUseJobDetail(),
  useJobId: () => 1,
  useGoToPage: () => mockGoBack,
}));

describe("JobDetail", () => {
  const mock = ({ detail = JobResponseMock, status = "succeed" } = {}) => {
    mockUseJobDetail.mockReturnValue({
      detail,
      status,
    });
  };

  test("status가 loading 일 때 Loading 스피너가 표시된다", async () => {
    mock({ status: "loading" });

    render(<JobDetail labId={1} />);

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  test("status가 failed 일 때 Alert가 표시된다. 확인 버튼을 클릭하면 이전 페이지로 이동한다", () => {
    mock({ status: "failed" });

    render(<JobDetail labId={1} />);

    expect(screen.getByRole("alertdialog")).toBeInTheDocument();

    userEvent.click(screen.getByRole("button"));

    expect(mockGoBack).toHaveBeenCalledTimes(1);
  });
});
