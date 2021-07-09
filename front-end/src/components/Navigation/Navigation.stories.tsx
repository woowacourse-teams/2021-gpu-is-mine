import { ComponentMeta, ComponentStory } from "@storybook/react";
import Navigation from "./Navigation";

export default {
  title: "Components/Navigation",
  component: Navigation,
} as ComponentMeta<typeof Navigation>;

const Template: ComponentStory<typeof Navigation> = (args) => <Navigation {...args} />;

export const Admin = Template.bind({});

Admin.args = {
  menu: ["GPU 서버 관리", "유저 관리"],
};

export const User = Template.bind({});

User.args = {
  menu: ["Job 현황", "GPU 서버 현황", "예약하기"],
};
