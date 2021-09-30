import { ComponentMeta, ComponentStory } from "@storybook/react";
import MemberSignupForm from "./MemberSignupForm";

export default {
  title: "features/Member/SignupForm",
  component: MemberSignupForm,
} as ComponentMeta<typeof MemberSignupForm>;

const Template: ComponentStory<typeof MemberSignupForm> = (args) => <MemberSignupForm {...args} />;

export const Default = Template.bind({});

Default.args = {};

Default.args = {};
