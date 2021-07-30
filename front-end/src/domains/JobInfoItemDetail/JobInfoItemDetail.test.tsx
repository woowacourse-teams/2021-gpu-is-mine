import { render, screen } from "test-utils";
import JobInfoItemDetail from "./JobInfoItemDetail";

describe("JobInfoItemDetail", () => {
  const setup = () => {
    render(<JobInfoItemDetail />);

    const jobNameHeading = screen.getByRole("heading", { level: 3, name: /Job 이름/ });
    const jobStatusHeading = screen.getByRole("heading", { level: 3, name: /Job 상태/ });
    const jobOwnerHeading = screen.getByRole("heading", { level: 3, name: /Job 등록자/ });
    const assignedServerHeading = screen.getByRole("heading", { level: 3, name: /할당된 서버/ });
    const logHeading = screen.getByRole("heading", { level: 3, name: /log/i });

    return { jobNameHeading, jobStatusHeading, jobOwnerHeading, assignedServerHeading, logHeading };
  };

  test("Job이름 h3가 보여진다", () => {
    const { jobNameHeading } = setup();

    expect(jobNameHeading).toBeInTheDocument();
  });

  test("Job 상태 h3가 보여진다", () => {
    const { jobStatusHeading } = setup();

    expect(jobStatusHeading).toBeInTheDocument();
  });

  test("Job 등록자 h3가 보여진다", () => {
    const { jobOwnerHeading } = setup();

    expect(jobOwnerHeading).toBeInTheDocument();
  });

  test("할당된 서버 h3가 보여진다", () => {
    const { assignedServerHeading } = setup();

    expect(assignedServerHeading).toBeInTheDocument();
  });

  test("Log h3가 보여진다", () => {
    const { logHeading } = setup();

    expect(logHeading).toBeInTheDocument();
  });
});
