import { ComponentStory, ComponentMeta } from "@storybook/react";
import GpuServerSelectItem from "./GpuServerSelectItem";
import { gpuServersResponses } from "../../__fixtures__";

export default {
  title: "Domains/GpuServer/SelectItem",
  component: GpuServerSelectItem,
} as ComponentMeta<typeof GpuServerSelectItem>;

const Template: ComponentStory<typeof GpuServerSelectItem> = (args) => (
  <GpuServerSelectItem {...args} />
);

export const Default = Template.bind({});

Default.args = {
  serverName: "GPU 서버",
  isOn: true,
  performance: 2_000,
  runningJobs: gpuServersResponses.gpuServers[0].runningJobs,
};

export const LongItem = Template.bind({});

LongItem.args = {
  serverName: "일이삼사오육칠팔구공일이삼사오",
  isOn: true,
  performance: 20_000,
  runningJobs: gpuServersResponses.gpuServers[2].runningJobs,
};
