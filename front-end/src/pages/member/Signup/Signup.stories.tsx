import { ComponentMeta, ComponentStory } from "@storybook/react";
import Signup from "./Signup";

export default {
  title: "Pages/Member/Signup",
  component: Signup,
} as ComponentMeta<typeof Signup>;

const Template: ComponentStory<typeof Signup> = () => <Signup />;

export const Default = Template.bind({});

Default.args = {};
