import { ComponentStory, ComponentMeta } from "@storybook/react";
import jobResponsesMock from "../../__fixtures__/jobsResponses";

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
  ...jobResponsesMock.jobResponses[1],
  status: "CANCELED",
};

export const WaitingJob = Template.bind({});

WaitingJob.args = {
  ...jobResponsesMock.jobResponses[2],
  status: "WAITING",
};

export const RunningJob = Template.bind({});

RunningJob.args = {
  ...jobResponsesMock.jobResponses[3],
  status: "RUNNING",
};
