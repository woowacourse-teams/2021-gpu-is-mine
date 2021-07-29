import { ComponentStory, ComponentMeta } from "@storybook/react";
import JobInfoList from "./JobInfoList";

export default {
  title: "Domains/Job/InfoList",
  component: JobInfoList,
} as ComponentMeta<typeof JobInfoList>;

const Template: ComponentStory<typeof JobInfoList> = () => <JobInfoList />;

export const Default = Template.bind({});

Default.args = {};
