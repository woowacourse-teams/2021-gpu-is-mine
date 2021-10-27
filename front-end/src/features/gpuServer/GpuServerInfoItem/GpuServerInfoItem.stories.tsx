import { ComponentStory, ComponentMeta } from "@storybook/react";
import GpuServerInfoItem from "./GpuServerInfoItem";
import { gpuServersResponses } from "../../../__fixtures__";

export default {
  title: "Domains/GpuServer/InfoItem",
  component: GpuServerInfoItem,
} as ComponentMeta<typeof GpuServerInfoItem>;

const Template: ComponentStory<typeof GpuServerInfoItem> = (args) => (
  <GpuServerInfoItem {...args} />
);

export const OnServerManager = Template.bind({});

OnServerManager.args = {
  serverId: gpuServersResponses.gpuServers[0].id,
};

// export const OffServerManager = Template.bind({});

// OffServerManager.args = {
//   ...gpuServersResponses.gpuServers[1],
// };

// export const LongManager = Template.bind({});

// LongManager.args = {
//   ...gpuServersResponses.gpuServers[2],
// };

// export const OnServerUser = Template.bind({});

// OnServerUser.args = {
//   ...gpuServersResponses.gpuServers[0],
// };

// export const OffServerUser = Template.bind({});

// OffServerUser.args = {
//   ...gpuServersResponses.gpuServers[1],
// };

// export const LongUser = Template.bind({});

// LongUser.args = {
//   ...gpuServersResponses.gpuServers[2],
// };
