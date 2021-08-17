import { ComponentStory, ComponentMeta } from "@storybook/react";
import GpuServerInfoItem from "./GpuServerInfoItem";
import { gpuServersResponses } from "../../__fixtures__";

export default {
  title: "Domains/GpuServer/InfoItem",
  component: GpuServerInfoItem,
} as ComponentMeta<typeof GpuServerInfoItem>;

const Template: ComponentStory<typeof GpuServerInfoItem> = (args) => (
  <GpuServerInfoItem {...args} />
);

export const OnServerManager = Template.bind({});

OnServerManager.args = {
  ...gpuServersResponses.gpuServers[0],
  memberType: "MANAGER",
};

export const OffServerManager = Template.bind({});

OffServerManager.args = {
  ...gpuServersResponses.gpuServers[1],
  memberType: "MANAGER",
};

export const LongManager = Template.bind({});

LongManager.args = {
  ...gpuServersResponses.gpuServers[2],
  memberType: "MANAGER",
};

export const OnServerUser = Template.bind({});

OnServerUser.args = {
  ...gpuServersResponses.gpuServers[0],
  memberType: "USER",
};

export const OffServerUser = Template.bind({});

OffServerUser.args = {
  ...gpuServersResponses.gpuServers[1],
  memberType: "USER",
};

export const LongUser = Template.bind({});

LongUser.args = {
  ...gpuServersResponses.gpuServers[2],
  memberType: "USER",
};
