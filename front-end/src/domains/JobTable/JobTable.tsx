import { useHistory } from "react-router-dom";
import { Button, Table } from "../../components";
import { StatusText } from "./JobTable.styled";
import { Field, JobStatus } from "../../types";
import { PATH } from "../../constants";
import type { Job } from "../../features/job/jobSlice";

interface JobTableProps {
  jobs: Job[];
  className?: string;
  rowCountPerPage?: number;
}

const jobFields: Field[] = [
  { name: "Job 상태", selector: "status", isSortable: true },
  { name: "Job 이름", selector: "name", isSortable: true },
  { name: "작업 소요 시간(h)", selector: "expectedTime", isSortable: true },
  { name: "(예상) 시작 시간", selector: "startTime", isSortable: true },
  { name: "(예상) 완료 시간", selector: "endTime", isSortable: true },
  { name: "등록자", selector: "memberName", isSortable: true },
  { name: "기타", selector: "etc", isSortable: false },
];

// eslint-disable-next-line consistent-return
const getJobStatusCell = (status: JobStatus) => {
  // eslint-disable-next-line default-case
  switch (status) {
    case "RUNNING":
      return {
        priority: 1,
        value: (
          <StatusText size="md" weight="bold" status={status}>
            진행중
          </StatusText>
        ),
      };
    case "WAITING":
      return {
        priority: 2,
        value: (
          <StatusText size="md" weight="bold" status={status}>
            대기중
          </StatusText>
        ),
      };
    case "COMPLETED":
      return {
        priority: 3,
        value: (
          <StatusText size="md" weight="bold" status={status}>
            완료됨
          </StatusText>
        ),
      };
    case "CANCELED":
      return {
        priority: 4,
        value: (
          <StatusText size="md" weight="bold" status={status}>
            취소됨
          </StatusText>
        ),
      };
  }
};

const JobTable = ({ jobs, rowCountPerPage = 5, ...rest }: JobTableProps) => {
  const history = useHistory();
  const goToJobDetail = (id: number | string) => history.push(`${PATH.JOB.VIEW}/${id}`);

  const rows = jobs
    .map(({ id, name, status, memberName, expectedTime, startTime, endTime }) => ({
      id,
      data: {
        status: getJobStatusCell(status),
        name: { value: name },
        expectedTime: { value: expectedTime },
        startedTime: { value: startTime },
        completedTime: { value: endTime },
        memberName: { value: memberName },
        etc: {
          value: (
            <Button color="primary" onClick={() => goToJobDetail(id)}>
              상세
            </Button>
          ),
        },
      },
    }))
    .sort((a, b) => a.data.status.priority - b.data.status.priority);

  return <Table fields={jobFields} rows={rows} rowCountPerPage={rowCountPerPage} {...rest} />;
};

export default JobTable;
