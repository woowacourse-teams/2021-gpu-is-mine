import { ComponentStory, ComponentMeta } from "@storybook/react";
import JobInfoList from "./JobInfoList";

export default {
  title: "Domains/Job/InfoList",
  component: JobInfoList,
} as ComponentMeta<typeof JobInfoList>;

const Template: ComponentStory<typeof JobInfoList> = (args) => <JobInfoList {...args} />;

export const Manager = Template.bind({});

Manager.args = {
  labId: 1,
  memberId: 2,
  memberType: "MANAGER",
};

export const User = Template.bind({});

User.args = {
  labId: 1,
  memberId: 2,
  memberType: "USER",
};
