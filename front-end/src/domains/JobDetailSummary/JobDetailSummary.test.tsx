import { render, screen } from "../../__test__/test-utils";
import JobDetailSummary from "./JobDetailSummary";
import { JobResponseMock } from "../../__fixtures__";

describe("JobDetail", () => {
  const setup = async () => {
    render(<JobDetailSummary detail={JobResponseMock} />);

    const jobNameRegex = new RegExp(JobResponseMock.name, "i");
    const jobNameHeading = screen.getByRole("heading", {
      level: 3,
      name: jobNameRegex,
    });
    const jobStatusHeading = screen.getByText("Job 상태");
    const jobStatus = screen.getByText(JobResponseMock.status);
    const jobOwnerHeading = screen.getByText("Job 등록자");
    const jobOwner = screen.getByText(JobResponseMock.memberName);
    const assignedServerHeading = screen.getByText("할당된 서버");
    const assignedServer = screen.getByText(JobResponseMock.gpuServerName);

    return {
      jobNameHeading,
      jobStatusHeading,
      jobStatus,
      jobOwnerHeading,
      jobOwner,
      assignedServerHeading,
      assignedServer,
    };
  };

  test("Job이름이 보여진다", async () => {
    const { jobNameHeading } = await setup();

    expect(jobNameHeading).toBeInTheDocument();
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
