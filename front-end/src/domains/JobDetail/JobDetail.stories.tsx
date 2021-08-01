import { ComponentStory, ComponentMeta } from "@storybook/react";
import JobDetail from "./JobDetail";

export default {
  title: "Domains/Job/Detail",
  component: JobDetail,
} as ComponentMeta<typeof JobDetail>;

const Template: ComponentStory<typeof JobDetail> = () => <JobDetail />;

export const Default = Template.bind({});

Default.args = {};
