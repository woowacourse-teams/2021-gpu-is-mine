import { ComponentMeta, ComponentStory } from "@storybook/react";
import ManagerSubHeader from "./ManagerSubHeader";

export default {
  title: "Domains/Manager/SubHeader",
  component: ManagerSubHeader,
} as ComponentMeta<typeof ManagerSubHeader>;

const Template: ComponentStory<typeof ManagerSubHeader> = (args) => <ManagerSubHeader {...args} />;

export const Default = Template.bind({});

Default.args = {
  labName: "우아한 Lab",
};
