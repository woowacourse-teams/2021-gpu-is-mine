import { ComponentMeta, ComponentStory } from "@storybook/react";
import ManagerHeader from "./ManagerHeader";

export default {
  title: "Domains/Manager/Header",
  component: ManagerHeader,
} as ComponentMeta<typeof ManagerHeader>;

const Template: ComponentStory<typeof ManagerHeader> = (args) => <ManagerHeader {...args} />;

export const Default = Template.bind({});

Default.args = {
  labName: "우아한 Lab",
};
