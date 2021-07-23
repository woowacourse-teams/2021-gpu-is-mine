import { ComponentStory, ComponentMeta } from "@storybook/react";

import JobRegisterRadioGroup from "./JobRegisterRadioGroup";

export default {
  title: "Domains/Job/RegisterRadioGroup",
  component: JobRegisterRadioGroup,
} as ComponentMeta<typeof JobRegisterRadioGroup>;

const Template: ComponentStory<typeof JobRegisterRadioGroup> = () => <JobRegisterRadioGroup />;

export const Default = Template.bind({});

Default.args = {};
