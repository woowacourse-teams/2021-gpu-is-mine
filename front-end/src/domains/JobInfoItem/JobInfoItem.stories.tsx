import { ComponentStory, ComponentMeta } from "@storybook/react";
import { jobsResponsesMock } from "../../__fixtures__";

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

export const CanceledJob = Template.bind({});

CanceledJob.args = {
  ...jobsResponsesMock.jobResponses[1],
  status: "CANCELED",
};

export const WaitingJob = Template.bind({});

WaitingJob.args = {
  ...jobsResponsesMock.jobResponses[2],
  status: "WAITING",
};

export const RunningJob = Template.bind({});

RunningJob.args = {
  ...jobsResponsesMock.jobResponses[3],
  status: "RUNNING",
};
