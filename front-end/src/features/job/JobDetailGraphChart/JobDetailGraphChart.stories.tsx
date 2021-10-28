import { ComponentStory, ComponentMeta } from "@storybook/react";
import JobDetailGraphChart from "./JobDetailGraphChart";
import { parsedLogs } from "../../../__fixtures__";

export default {
  title: "Domains/Job/DetailGraphChart",
  component: JobDetailGraphChart,
} as ComponentMeta<typeof JobDetailGraphChart>;

const Template: ComponentStory<typeof JobDetailGraphChart> = (args) => (
  <JobDetailGraphChart {...args} />
);

export const Default = Template.bind({});

Default.args = {
  data: parsedLogs,
};
