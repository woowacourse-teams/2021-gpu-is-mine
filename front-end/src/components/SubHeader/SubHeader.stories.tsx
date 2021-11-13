import { ComponentMeta, ComponentStory } from "@storybook/react";
import SubHeader from "./SubHeader";

export default {
  title: "Domains/Manager/SubHeader",
  component: SubHeader,
} as ComponentMeta<typeof SubHeader>;

const Template: ComponentStory<typeof SubHeader> = (args) => <SubHeader {...args} />;

export const Default = Template.bind({});

Default.args = {};
