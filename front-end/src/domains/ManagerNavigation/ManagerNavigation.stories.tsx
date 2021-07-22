import { ComponentMeta, ComponentStory } from "@storybook/react";
import ManagerNavigation from "./ManagerNavigation";

export default {
  title: "Domains/Manager/Navigation",
  component: ManagerNavigation,
} as ComponentMeta<typeof ManagerNavigation>;

const Template: ComponentStory<typeof ManagerNavigation> = (args) => (
  <ManagerNavigation {...args} />
);

export const Default = Template.bind({});

Default.args = {};
