import { ComponentMeta, ComponentStory } from "@storybook/react";
import JobViewDetail from "./JobViewDetail";

export default {
  title: "Pages/Manager/JobViewDetail",
  component: JobViewDetail,
} as ComponentMeta<typeof JobViewDetail>;

const Template: ComponentStory<typeof JobViewDetail> = () => <JobViewDetail />;

export const Default = Template.bind({});

Default.args = {};
