import { ComponentStory, ComponentMeta } from "@storybook/react";

import JobRegisterRadioGroup from "./JobRegisterRadioGroup";

export default {
  title: "Domains/Job/RegisterRadioGroup",
  component: JobRegisterRadioGroup,
} as ComponentMeta<typeof JobRegisterRadioGroup>;

const Template: ComponentStory<typeof JobRegisterRadioGroup> = (args) => (
  <JobRegisterRadioGroup {...args} />
);

export const Default = Template.bind({});

Default.args = {
  minPerformance: 800,
  labId: 1,
  name: "jobName",
  label: "GPU 서버",
};
