import { ComponentMeta, ComponentStory } from "@storybook/react";
import MemberLoginForm from "../MemberLoginForm/MemberLoginForm";
import MemberSignupForm from "../MemberSignupForm/MemberSignupForm";
import MemberLayout from "./MemberLayout";

export default {
  title: "Domains/Member/Layout",
  component: MemberLayout,
} as ComponentMeta<typeof MemberLayout>;

const Template: ComponentStory<typeof MemberLayout> = (args) => <MemberLayout {...args} />;

export const Signup = Template.bind({});

Signup.args = {
  children: <MemberSignupForm />,
};

export const Login = Template.bind({});

Login.args = {
  children: <MemberLoginForm />,
};
