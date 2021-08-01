import { ComponentStory, ComponentMeta } from "@storybook/react";
import JobDetail from "./JobDetail";

export default {
  title: "Domains/Job/Detail",
  component: JobDetail,
} as ComponentMeta<typeof JobDetail>;

const Template: ComponentStory<typeof JobDetail> = (args) => <JobDetail {...args} />;

export const Default = Template.bind({});

Default.args = {
  labId: 1,
};
