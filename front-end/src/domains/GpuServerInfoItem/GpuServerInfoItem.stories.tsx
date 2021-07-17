import { ComponentStory, ComponentMeta } from "@storybook/react";
import GpuServerInfoItem from "./GpuServerInfoItem";
import { gpuServersResponses } from "../../fixtures";

export default {
  title: "Domains/GpuServer/InfoItem",
  component: GpuServerInfoItem,
} as ComponentMeta<typeof GpuServerInfoItem>;

const Template: ComponentStory<typeof GpuServerInfoItem> = (args) => (
  <GpuServerInfoItem {...args} />
);

export const OnServer = Template.bind({});

OnServer.args = {
  ...gpuServersResponses.gpuServers[0],
};

export const OffServer = Template.bind({});

OffServer.args = {
  ...gpuServersResponses.gpuServers[1],
};

export const Long = Template.bind({});

Long.args = {
  ...gpuServersResponses.gpuServers[2],
};
