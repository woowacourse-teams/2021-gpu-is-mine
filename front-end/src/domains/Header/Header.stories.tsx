import { ComponentMeta, ComponentStory } from "@storybook/react";
import Header from "./Header";

export default {
  title: "Domains/Manager/Header",
  component: Header,
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = (args) => <Header {...args} />;

export const Default = Template.bind({});

Default.args = {
  labName: "GPU_IS_MINE",
};
