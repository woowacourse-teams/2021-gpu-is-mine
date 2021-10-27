/* eslint-disable import/prefer-default-export */

export const gpuServer = {
  id: 1,
  serverName: "serverA",
  memorySize: 1024,
  diskSize: 2048,
  isOn: true,
  waitingJobCount: 52,
  totalExpectedTime: 146,
  modelName: "NVIDIA42",
  performance: 600,
  runningJob: {
    id: 2,
    name: "가짜 뉴스 검증을 위한 댓글 분류 학습",
    status: "RUNNING",
    memberId: 1,
  },
};
