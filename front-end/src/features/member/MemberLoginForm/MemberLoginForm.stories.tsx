import { ComponentMeta, ComponentStory } from "@storybook/react";
import MemberLoginForm from "./MemberLoginForm";

export default {
  title: "Domains/Member/LoginForm",
  component: MemberLoginForm,
} as ComponentMeta<typeof MemberLoginForm>;

const Template: ComponentStory<typeof MemberLoginForm> = () => <MemberLoginForm />;

export const Default = Template.bind({});

Default.args = {};
