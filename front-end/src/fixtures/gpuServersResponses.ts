import { GpuServerViewResponses } from "../types";

const gpuServersResponses: GpuServerViewResponses = {
  gpuServers: [
    {
      id: 1,
      serverName: "GPU 서버 1",
      memorySize: 600,
      diskSize: 1024,
      isOn: true,
      gpuBoard: {
        id: 1,
        modelName: "Nvidia GeForce RTX 2080 Ti",
        performance: 1000,
        isWorking: true,
      },
      jobs: [
        {
          id: 1,
          name: "위암 1,2기 구분 학습",
          status: "RUNNING",
        },
        {
          id: 2,
          name: "모델 학습 2",
          status: "COMPLETED",
        },
        {
          id: 4,
          name: "예약4",
          status: "WAITING",
        },
      ],
    },
    {
      id: 2,
      serverName: "GPU서버2",
      memorySize: 800,
      diskSize: 1024,
      isOn: true,
      gpuBoard: {
        id: 2,
        modelName: "Nvidia GeForce RTX 2070",
        performance: 1500,
        isWorking: false,
      },
      jobs: [
        {
          id: 1,
          name: "모델 학습 2",
          status: "COMPLETED",
        },
        {
          id: 2,
          name: "모델 학습 3",
          status: "WAITING",
        },
        {
          id: 3,
          name: "모델 학습 4",
          status: "WAITING",
        },
      ],
    },
    {
      id: 3,
      serverName: "GPU 서버 1ABCD동동동", // TODO: validation max: 15자
      memorySize: 800,
      diskSize: 1024,
      isOn: true,
      gpuBoard: {
        id: 2,
        modelName: "Nvidia GeForce RTX 2070",
        performance: 10_044_564_560,
        isWorking: true,
      },
      jobs: [
        {
          id: 5,
          name: "위암 1,2기 구분 학습위암 1,2기", // TODO: validaiton max: 20자
          status: "RUNNING",
        },
        { id: 8, name: "모델 학습 2", status: "COMPLETED" },
        { id: 1, name: "모델 학습 3", status: "WAITING" },
        { id: 2, name: "모델 학습 4", status: "WAITING" },
        { id: 3, name: "예약3", status: "WAITING" },
      ],
    },
  ],
} as const;

export default gpuServersResponses;
