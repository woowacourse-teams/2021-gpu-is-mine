import { JobViewResponses } from "../types/jobs";

const jobResponsesMock: JobViewResponses = {
  jobResponses: [
    {
      id: 1,
      name: "job1",
      status: "WAITING",
      memberId: 1,
      memberName: "name1",
      gpuServerId: 1,
      gpuServerName: "server1",
    },
    {
      id: 2,
      name: "job2job2job2job2job2job2job2job2job2job2job2job2job2job2job2",
      status: "RUNNING",
      memberId: 1,
      memberName: "name1",
      gpuServerId: 1,
      gpuServerName: "server1",
    },
    {
      id: 3,
      name: "job3",
      status: "COMPLETED",
      memberId: 2,
      memberName: "name2name2name2name2name2name2name2name2name2name2name2name2",
      gpuServerId: 1,
      gpuServerName: "server1",
    },
    {
      id: 4,
      name: "위암 1,2기 구분 학습",
      status: "COMPLETED",
      memberId: 1,
      memberName: "name1",
      gpuServerId: 1,
      gpuServerName: "server1",
    },
    {
      id: 5,
      name: "job5",
      status: "WAITING",
      memberId: 1,
      memberName: "name1",
      gpuServerId: 1,
      gpuServerName: "server1",
    },
    {
      id: 6,
      name: "job6",
      status: "CANCELED",
      memberId: 1,
      memberName: "name1",
      gpuServerId: 2,
      gpuServerName: "server2",
    },
    {
      id: 7,
      name: "job7",
      status: "WAITING",
      memberId: 1,
      memberName: "name1",
      gpuServerId: 2,
      gpuServerName: "server2",
    },
    {
      id: 8,
      name: "job8",
      status: "RUNNING",
      memberId: 1,
      memberName: "name1",
      gpuServerId: 3,
      gpuServerName: "server3",
    },
    {
      id: 9,
      name: "job9",
      status: "WAITING",
      memberId: 1,
      memberName: "name1",
      gpuServerId: 4,
      gpuServerName: "server4",
    },
    {
      id: 10,
      name: "job10",
      status: "RUNNING",
      memberId: 1,
      memberName: "name1",
      gpuServerId: 4,
      gpuServerName: "server4",
    },
  ],
} as const;

export default jobResponsesMock;
