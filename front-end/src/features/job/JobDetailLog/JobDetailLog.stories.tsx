import { ComponentStory, ComponentMeta } from "@storybook/react";
import JobDetailLog from "./JobDetailLog";

export default {
  title: "Domains/Job/DetailLog",
  component: JobDetailLog,
} as ComponentMeta<typeof JobDetailLog>;

const Template: ComponentStory<typeof JobDetailLog> = (args) => <JobDetailLog {...args} />;

export const Default = Template.bind({});

Default.args = {
  labId: 1,
  jobId: 1,
};
