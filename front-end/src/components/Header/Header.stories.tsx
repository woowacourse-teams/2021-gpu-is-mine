import { ComponentMeta, ComponentStory } from "@storybook/react";
import Navigation from "../Navigation/Navigation";
import Header from "./Header";
import * as NavigationStories from "../Navigation/Navigation.stories";

export default {
  title: "Components/Header",
  component: Header,
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = (args) => <Header {...args} />;

export const Default = Template.bind({});

Default.args = {
  labName: "우아한 Lab",
};

export const Admin = Template.bind({});

Admin.args = {
  labName: "우아한 Lab",
  children: <Navigation {...NavigationStories.Admin.args} />,
};

export const User = Template.bind({});

User.args = {
  labName: "우아한 Lab",
  children: <Navigation {...NavigationStories.User.args} />,
};
