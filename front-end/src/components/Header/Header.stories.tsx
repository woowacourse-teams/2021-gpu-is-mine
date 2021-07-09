import { ComponentMeta, ComponentStory } from "@storybook/react";
import Header from "./Header";

export default {
  title: "Components/Header",
  component: Header,
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = (args) => <Header {...args} />;

export const Default = Template.bind({});

Default.args = {
  labName: "우아한 Lab",
};

export const Menu = Template.bind({});

Menu.args = {
  labName: "우아한 Lab",
  children: "메뉴",
};
