import { ComponentStory, ComponentMeta } from "@storybook/react";
import JobTable from "./JobTable";

export default {
  title: "domains/Job/Table",
  component: JobTable,
} as ComponentMeta<typeof JobTable>;

const Template: ComponentStory<typeof JobTable> = (args) => <JobTable {...args} />;

export const Default = Template.bind({});

Default.args = {};
