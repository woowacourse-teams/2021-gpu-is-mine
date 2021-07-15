import { ComponentStory, ComponentMeta } from "@storybook/react";
import GpuServerInfoItem from "./GpuServerInfoItem";

export default {
  title: "Domains/GpuServer/InfoItem",
  component: GpuServerInfoItem,
} as ComponentMeta<typeof GpuServerInfoItem>;

const Template: ComponentStory<typeof GpuServerInfoItem> = (args) => (
  <GpuServerInfoItem {...args} />
);

export const OnServer = Template.bind({});

OnServer.args = {
  name: "GPU 서버 1",
  performance: 1000,
  isServerOn: true,
  jobs: [
    {
      name: "위암 1,2기 구분 학습",
      status: "RUNNING",
    },
    {
      name: "모델 학습 2",
      status: "COMPLETED",
    },
    {
      name: "모델 학습 3",
      status: "WAITING",
    },
    {
      name: "모델 학습 4",
      status: "WAITING",
    },
  ],
};

export const OffServer = Template.bind({});

OffServer.args = {
  name: "GPU 서버 2",
  performance: 1500,
  isServerOn: false,
  jobs: [
    {
      name: "모델 학습 2",
      status: "COMPLETED",
    },
    {
      name: "모델 학습 3",
      status: "WAITING",
    },
    {
      name: "모델 학습 4",
      status: "WAITING",
    },
  ],
};

export const Long = Template.bind({});

Long.args = {
  name: "GPU 서버 1ABCD동동동", //TODO: validation max: 15자
  performance: 10_044_564_560,
  isServerOn: true,
  jobs: [
    {
      name: "위암 1,2기 구분 학습위암 1,2기", //TODO: validaiton max: 20자
      status: "RUNNING",
    },
    {
      name: "모델 학습 2",
      status: "COMPLETED",
    },
    {
      name: "모델 학습 3",
      status: "WAITING",
    },
    {
      name: "모델 학습 4",
      status: "WAITING",
    },
  ],
};
