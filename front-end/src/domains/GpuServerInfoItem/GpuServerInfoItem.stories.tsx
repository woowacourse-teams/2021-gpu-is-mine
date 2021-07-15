import { ComponentStory, ComponentMeta } from "@storybook/react";
import GpuServerInfoItem from "./GpuServerInfoItem";
import GpuServerViewResponse from "../../fixtures/gpuServeViewrResponses";

export default {
  title: "Domains/GpuServer/InfoItem",
  component: GpuServerInfoItem,
} as ComponentMeta<typeof GpuServerInfoItem>;

const Template: ComponentStory<typeof GpuServerInfoItem> = (args) => (
  <GpuServerInfoItem {...args} />
);

export const OnServer = Template.bind({});

OnServer.args = {
  ...GpuServerViewResponse.gpus[0],
};

export const OffServer = Template.bind({});

OffServer.args = {
  ...GpuServerViewResponse.gpus[1],
};

export const Long = Template.bind({});

Long.args = {
  ...GpuServerViewResponse.gpus[2],
};
