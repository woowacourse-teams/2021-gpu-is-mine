import { ComponentStory, ComponentMeta } from "@storybook/react";
import { JobResponseMock } from "../../__fixtures__";
import JobDetailSummary from "./JobDetailSummary";

export default {
  title: "Domains/Job/DetailSummary",
  component: JobDetailSummary,
} as ComponentMeta<typeof JobDetailSummary>;

const Template: ComponentStory<typeof JobDetailSummary> = (args) => <JobDetailSummary {...args} />;

export const Default = Template.bind({});

Default.args = {
  detail: JobResponseMock,
};
