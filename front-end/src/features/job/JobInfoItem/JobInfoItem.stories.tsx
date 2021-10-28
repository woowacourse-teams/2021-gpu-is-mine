import { ComponentStory, ComponentMeta } from "@storybook/react";
import JobInfoItem from "./JobInfoItem";

export default {
  title: "Domains/Job/InfoItem",
  component: JobInfoItem,
} as ComponentMeta<typeof JobInfoItem>;

const Template: ComponentStory<typeof JobInfoItem> = (args) => <JobInfoItem {...args} />;

export const CompletedJob = Template.bind({});

CompletedJob.args = {
  id: 1,
  status: "COMPLETED",
  name: "JOB1",
  gpuServerName: "일이삼사오육칠팔구십일이삼사오",
  memberName: "MEMBER",
};
