import { render, screen } from "../../../__test__/test-utils";
import JobDetailSummary from "./JobDetailSummary";
import { jobReduxMock } from "../../../__fixtures__";

describe("JobDetail", () => {
  const setup = async () => {
    render(<JobDetailSummary detail={jobReduxMock} />);

    const jobNameRegex = new RegExp(jobReduxMock.name, "i");
    const jobNameHeading = screen.getByRole("heading", {
      level: 3,
      name: jobNameRegex,
    });
    const jobStatusHeading = screen.getByText("Job 상태");
    const jobStatus = screen.getByText(jobReduxMock.status);
    const jobOwnerHeading = screen.getByText("Job 등록자");
    const jobOwner = screen.getByText(jobReduxMock.memberName);
    const assignedServerHeading = screen.getByText("할당된 서버");
    const assignedServer = screen.getByText(jobReduxMock.gpuServerName);

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
