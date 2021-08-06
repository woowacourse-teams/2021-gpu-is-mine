import { screen, render, waitForElementToBeRemoved } from "@testing-library/react";
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
  const setup = async () => {
    render(<JobDetail labId={1} />);

    const jobNameHeading = await screen.findByRole("heading", { level: 4, name: /job 이름/i });
    const jobName = screen.getByText(JobResponseMock.name);
    const jobStatusHeading = screen.getByRole("heading", { level: 4, name: /Job 상태/i });
    const jobStatus = screen.getByText(JobResponseMock.status);
    const jobOwnerHeading = screen.getByRole("heading", { level: 4, name: /Job 등록자/i });
    const jobOwner = screen.getByText(JobResponseMock.memberName);
    const assignedServerHeading = screen.getByRole("heading", { level: 4, name: /할당된 서버/i });
    const assignedServer = screen.getByText(JobResponseMock.gpuServerName);
    const logHeading = screen.getByRole("heading", { level: 3, name: /log/i });

    return {
      jobNameHeading,
      jobName,
      jobStatusHeading,
      jobStatus,
      jobOwnerHeading,
      jobOwner,
      assignedServerHeading,
      assignedServer,
      logHeading,
    };
  };

  const mock = ({ detail = JobResponseMock, status = "succeed" } = {}) => {
    mockUseJobDetail.mockReturnValue({
      detail,
      status,
    });
  };

  test("Job이름이 보여진다", async () => {
    mock();
    const { jobNameHeading, jobName } = await setup();

    expect(jobNameHeading).toBeInTheDocument();
    expect(jobName).toBeInTheDocument();

    await waitForElementToBeRemoved(() => screen.getByText(/로그 데이터를 불러오는 중입니다/));
  });

  test("Job 상태가 보여진다", async () => {
    mock();

    const { jobStatusHeading, jobStatus } = await setup();

    expect(jobStatusHeading).toBeInTheDocument();
    expect(jobStatus).toBeInTheDocument();

    await waitForElementToBeRemoved(() => screen.getByText(/로그 데이터를 불러오는 중입니다/));
  });

  test("Job 등록자가 보여진다", async () => {
    mock();

    const { jobOwnerHeading, jobOwner } = await setup();

    expect(jobOwnerHeading).toBeInTheDocument();
    expect(jobOwner).toBeInTheDocument();

    await waitForElementToBeRemoved(() => screen.getByText(/로그 데이터를 불러오는 중입니다/));
  });

  test("할당된 서버가 보여진다", async () => {
    mock();

    const { assignedServerHeading, assignedServer } = await setup();

    expect(assignedServerHeading).toBeInTheDocument();
    expect(assignedServer).toBeInTheDocument();

    await waitForElementToBeRemoved(() => screen.getByText(/로그 데이터를 불러오는 중입니다/));
  });

  test("Log가 보여진다", async () => {
    mock();

    const { logHeading } = await setup();

    expect(logHeading).toBeInTheDocument();

    await waitForElementToBeRemoved(() => screen.getByText(/로그 데이터를 불러오는 중입니다/));
  });

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
