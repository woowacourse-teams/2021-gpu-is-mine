import { ComponentMeta, ComponentStory } from "@storybook/react";
import JobView from "./JobView";

export default {
  title: "Pages/Manager/JobView",
  component: JobView,
} as ComponentMeta<typeof JobView>;

const Template: ComponentStory<typeof JobView> = () => <JobView />;

export const Default = Template.bind({});

Default.args = {};
