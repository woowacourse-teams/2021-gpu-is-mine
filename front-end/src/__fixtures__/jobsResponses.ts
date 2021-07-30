import { JobViewResponses } from "../types";

export const JobResponseMock = {
  id: 4,
  name: "위암 1,2기 구분 학습",
  status: "COMPLETED",
  memberId: 1,
  memberName: "name1",
  gpuServerId: 1,
  gpuServerName: "server1",
};

export const jobsResponsesMock: JobViewResponses = {
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

export const logData = `
Train on 60000 samples, validate on 10000 samples
Epoch 1/5
60000/60000 [==============================] - 15s 246us/sample - loss: 0.2217 - accuracy: 0.9343 - val_loss: 0.1019 - val_accuracy: 0.9685
Epoch 2/5
60000/60000 [==============================] - 14s 229us/sample - loss: 0.0975 - accuracy: 0.9698 - val_loss: 0.0787 - val_accuracy: 0.9758
Epoch 3/5
60000/60000 [==============================] - 14s 229us/sample - loss: 0.0975 - accuracy: 0.9698 - val_loss: 0.0787 - val_accuracy: 0.9758
Epoch 4/5
60000/60000 [==============================] - 14s 229us/sample - loss: 0.0975 - accuracy: 0.9698 - val_loss: 0.0787 - val_accuracy: 0.9758
Epoch 5/5
60000/60000 [==============================] - 14s 229us/sample - loss: 0.0975 - accuracy: 0.9698 - val_loss: 0.0787 - val_accuracy: 0.9758
`;
