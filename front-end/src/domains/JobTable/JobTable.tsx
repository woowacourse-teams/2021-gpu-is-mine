import { useHistory } from "react-router-dom";
import { addHours, formatDate, pick } from "../../utils";
import { Button, Table } from "../../components";
import { StatusText } from "./JobTable.styled";
import { Field, JobStatus, JobViewResponse, Row } from "../../types";
import { PATH } from "../../constants";

interface JobTableProps {
  jobs: JobViewResponse[];
}

const jobFields: Field[] = [
  { name: "Job 상태", selector: "status", isSortable: true },
  { name: "Job 이름", selector: "name", isSortable: true },
  { name: "작업 소요 시간(h)", selector: "expectedTime", isSortable: true },
  { name: "(예상) 시작 시간", selector: "startTime", isSortable: true },
  { name: "(예상) 완료 시간", selector: "completedTime", isSortable: true },
  { name: "등록자", selector: "memberName", isSortable: true },
  { name: "기타", selector: "etc", isSortable: false },
];

const getJobStatusCell = (status: JobStatus) => {
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
    default:
      return {
        value: null,
      };
  }
};

const JobTable = ({ jobs }: JobTableProps) => {
  const history = useHistory();

  const goToJobDetail = (id: number | string) => history.push(`${PATH.JOB.VIEW}/${id}`);

  const fieldSelectors = ["id", "name", "status", "memberName", "expectedTime"];

  const rows = jobs
    .map((job) => pick(job, fieldSelectors))
    .map(({ id, name, status, memberName, expectedTime }) => ({
      id: Number(id),
      data: {
        status: getJobStatusCell(status as JobStatus),
        name: { value: name },
        expectedTime: { value: expectedTime },
        startTime: { value: formatDate(new Date()) },
        completedTime: { value: formatDate(addHours(new Date(), Number(expectedTime))) },
        memberName: { value: memberName },
        etc: {
          value: (
            <Button color="primary" onClick={() => goToJobDetail(Number(id))}>
              상세
            </Button>
          ),
        },
      },
    })) as Row[];

  return <Table fields={jobFields} rows={rows} rowCountPerPage={5} />;
};

export default JobTable;
