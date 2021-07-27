import { ComponentMeta, ComponentStory } from "@storybook/react";
import SignupForm from "./SignupForm";

export default {
  title: "Domains/Member/SignupForm",
  component: SignupForm,
} as ComponentMeta<typeof SignupForm>;

const Template: ComponentStory<typeof SignupForm> = () => <SignupForm />;

export const Default = Template.bind({});

Default.args = {};
