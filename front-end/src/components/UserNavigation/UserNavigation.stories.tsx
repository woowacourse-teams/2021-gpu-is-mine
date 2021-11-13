import { ComponentMeta, ComponentStory } from "@storybook/react";
import UserNavigation from "./UserNavigation";

export default {
  title: "Domains/User/Navigation",
  component: UserNavigation,
} as ComponentMeta<typeof UserNavigation>;

const Template: ComponentStory<typeof UserNavigation> = (args) => <UserNavigation {...args} />;

export const Default = Template.bind({});

Default.args = {};
