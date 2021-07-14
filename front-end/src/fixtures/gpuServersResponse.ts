export const gpuServersResponse = {
  gpus: [
    {
      id: 1,
      serverName: "GPU서버1",
      memorySize: 600,
      diskSize: 1024,
      isOn: false,
      gpuBoard: {
        id: 1,
        modelName: "Nvidia GeForce RTX 2080 Ti",
        performance: 800,
        isWorking: true,
      },
      jobs: [
        {
          id: 1,
          name: "예약1",
          status: "RUNNING",
        },
        {
          id: 2,
          name: "예약2",
          status: "WAITING",
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
        performance: 800,
        isWorking: true,
      },
      jobs: [
        {
          id: 3,
          name: "예약3",
          status: "WAITING",
        },
      ],
    },
  ],
} as const;
