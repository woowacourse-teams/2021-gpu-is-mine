import { ComponentMeta, ComponentStory } from "@storybook/react";
import AdminHeader from "./AdminHeader";

export default {
  title: "Domains/Admin/Header",
  component: AdminHeader,
} as ComponentMeta<typeof AdminHeader>;

const Template: ComponentStory<typeof AdminHeader> = (args) => <AdminHeader {...args} />;

export const Default = Template.bind({});

Default.args = {
  labName: "우아한 Lab",
};
