import { ComponentMeta, ComponentStory } from "@storybook/react";
import MemberSignupForm from "./MemberSignupForm";

export default {
  title: "Domains/Member/SignupForm",
  component: MemberSignupForm,
} as ComponentMeta<typeof MemberSignupForm>;

const Template: ComponentStory<typeof MemberSignupForm> = () => <MemberSignupForm />;

export const Default = Template.bind({});

Default.args = {};
