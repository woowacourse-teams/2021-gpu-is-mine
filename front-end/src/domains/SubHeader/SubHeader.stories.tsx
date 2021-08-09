import { ComponentMeta, ComponentStory } from "@storybook/react";
import ManagerSubHeader from "./SubHeader";

export default {
  title: "Domains/Manager/SubHeader",
  component: ManagerSubHeader,
} as ComponentMeta<typeof ManagerSubHeader>;

const Template: ComponentStory<typeof ManagerSubHeader> = (args) => <ManagerSubHeader {...args} />;

export const Default = Template.bind({});

Default.args = {};
