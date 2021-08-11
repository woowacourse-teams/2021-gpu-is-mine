import { ComponentMeta, ComponentStory } from "@storybook/react";
import Login from "./Login";

export default {
  title: "Pages/Login",
  component: Login,
} as ComponentMeta<typeof Login>;

const Template: ComponentStory<typeof Login> = () => <Login />;

export const Default = Template.bind({});

Default.args = {};
