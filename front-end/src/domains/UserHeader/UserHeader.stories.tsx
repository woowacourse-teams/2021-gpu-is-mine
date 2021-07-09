import { ComponentMeta, ComponentStory } from "@storybook/react";
import UserHeader from "./UserHeader";

export default {
  title: "Domains/User/Header",
  component: UserHeader,
} as ComponentMeta<typeof UserHeader>;

const Template: ComponentStory<typeof UserHeader> = (args) => <UserHeader {...args} />;

export const Default = Template.bind({});

Default.args = {
  labName: "우아한 Lab",
};
