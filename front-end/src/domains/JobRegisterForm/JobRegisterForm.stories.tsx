import { ComponentStory, ComponentMeta } from "@storybook/react";

import JobRegisterForm from "./JobRegisterForm";

export default {
  title: "Domains/Job/RegisterForm",
  component: JobRegisterForm,
} as ComponentMeta<typeof JobRegisterForm>;

const Template: ComponentStory<typeof JobRegisterForm> = () => <JobRegisterForm />;

export const Default = Template.bind({});

Default.args = {};
