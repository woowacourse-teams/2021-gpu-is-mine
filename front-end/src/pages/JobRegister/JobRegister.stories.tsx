import { ComponentMeta, ComponentStory } from "@storybook/react";
import JobRegister from "./JobRegister";

export default {
  title: "Pages/JobRegister",
  component: JobRegister,
} as ComponentMeta<typeof JobRegister>;

const Template: ComponentStory<typeof JobRegister> = () => <JobRegister />;

export const Default = Template.bind({});

Default.args = {};
