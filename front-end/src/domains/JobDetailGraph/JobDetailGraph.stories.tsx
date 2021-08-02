import { ComponentStory, ComponentMeta } from "@storybook/react";
import { JobResponseMock } from "../../__fixtures__";
import JobDetailGraph from "./JobDetailGraph";

export default {
  title: "Domains/Job/DetailGraph",
  component: JobDetailGraph,
} as ComponentMeta<typeof JobDetailGraph>;

const Template: ComponentStory<typeof JobDetailGraph> = (args) => <JobDetailGraph {...args} />;

export const Default = Template.bind({});

Default.args = {
  detail: JobResponseMock,
};
