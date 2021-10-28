import { ComponentStory, ComponentMeta } from "@storybook/react";
import JobDetailSummary from "./JobDetailSummary";

export default {
  title: "Domains/Job/DetailSummary",
  component: JobDetailSummary,
} as ComponentMeta<typeof JobDetailSummary>;

const Template: ComponentStory<typeof JobDetailSummary> = (args) => <JobDetailSummary {...args} />;

export const Default = Template.bind({});

Default.args = {
  detail: {
    id: 10,
    name: "string",
    status: "RUNNING",

    memberId: 1,
    memberName: "string",
    gpuServerId: 2,
    gpuServerName: "string",

    dockerHubImage: "string/string",
    expectedTime: "string",
    createdTime: "string",
    startTime: "string",
    endTime: "string",
  },
};
