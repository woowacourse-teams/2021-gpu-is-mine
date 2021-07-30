import { render, screen } from "test-utils";
import JobInfoItemDetail from "./JobInfoItemDetail";
import { JobResponseMock } from "../../__fixtures__";

describe("JobInfoItemDetail", () => {
  const setup = () => {
    render(<JobInfoItemDetail />);

    const jobNameHeading = screen.getByRole("heading", { level: 3, name: /Job 이름/i });
    const jobName = screen.getByText(JobResponseMock.name);
    const jobStatusHeading = screen.getByRole("heading", { level: 3, name: /Job 상태/i });
    const jobStatus = screen.getByText(JobResponseMock.status);
    const jobOwnerHeading = screen.getByRole("heading", { level: 3, name: /Job 등록자/i });
    const jobOwner = screen.getByText(JobResponseMock.memberName);
    const assignedServerHeading = screen.getByRole("heading", { level: 3, name: /할당된 서버/i });
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

  test("Job이름이 보여진다", () => {
    const { jobNameHeading, jobName } = setup();

    expect(jobNameHeading).toBeInTheDocument();
    expect(jobName).toBeInTheDocument();
  });

  test("Job 상태가 보여진다", () => {
    const { jobStatusHeading, jobStatus } = setup();

    expect(jobStatusHeading).toBeInTheDocument();
    expect(jobStatus).toBeInTheDocument();
  });

  test("Job 등록자가 보여진다", () => {
    const { jobOwnerHeading, jobOwner } = setup();

    expect(jobOwnerHeading).toBeInTheDocument();
    expect(jobOwner).toBeInTheDocument();
  });

  test("할당된 서버가 보여진다", () => {
    const { assignedServerHeading, assignedServer } = setup();

    expect(assignedServerHeading).toBeInTheDocument();
    expect(assignedServer).toBeInTheDocument();
  });

  test("Log가 보여진다", () => {
    const { logHeading } = setup();

    expect(logHeading).toBeInTheDocument();
  });
});
