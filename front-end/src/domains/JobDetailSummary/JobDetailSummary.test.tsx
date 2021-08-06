import { screen, render } from "@testing-library/react";
import JobDetailSummary from "./JobDetailSummary";
import { JobResponseMock } from "../../__fixtures__";

describe("JobDetail", () => {
  const setup = async () => {
    render(<JobDetailSummary detail={JobResponseMock} />);

    const jobNameHeading = await screen.findByRole("heading", { level: 4, name: /job 이름/i });
    const jobName = screen.getByText(JobResponseMock.name);
    const jobStatusHeading = screen.getByRole("heading", { level: 4, name: /Job 상태/i });
    const jobStatus = screen.getByText(JobResponseMock.status);
    const jobOwnerHeading = screen.getByRole("heading", { level: 4, name: /Job 등록자/i });
    const jobOwner = screen.getByText(JobResponseMock.memberName);
    const assignedServerHeading = screen.getByRole("heading", { level: 4, name: /할당된 서버/i });
    const assignedServer = screen.getByText(JobResponseMock.gpuServerName);

    return {
      jobNameHeading,
      jobName,
      jobStatusHeading,
      jobStatus,
      jobOwnerHeading,
      jobOwner,
      assignedServerHeading,
      assignedServer,
    };
  };

  test("Job이름이 보여진다", async () => {
    const { jobNameHeading, jobName } = await setup();

    expect(jobNameHeading).toBeInTheDocument();
    expect(jobName).toBeInTheDocument();
  });

  test("Job 상태가 보여진다", async () => {
    const { jobStatusHeading, jobStatus } = await setup();

    expect(jobStatusHeading).toBeInTheDocument();
    expect(jobStatus).toBeInTheDocument();
  });

  test("Job 등록자가 보여진다", async () => {
    const { jobOwnerHeading, jobOwner } = await setup();

    expect(jobOwnerHeading).toBeInTheDocument();
    expect(jobOwner).toBeInTheDocument();
  });

  test("할당된 서버가 보여진다", async () => {
    const { assignedServerHeading, assignedServer } = await setup();

    expect(assignedServerHeading).toBeInTheDocument();
    expect(assignedServer).toBeInTheDocument();
  });
});
