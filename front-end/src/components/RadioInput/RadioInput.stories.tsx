import { ComponentStory, ComponentMeta } from "@storybook/react";

import RadioInput from "./RadioInput";

export default {
  title: "Components/RadioInput",
  component: RadioInput,
} as ComponentMeta<typeof RadioInput>;

const Template: ComponentStory<typeof RadioInput> = (args) => <RadioInput {...args} />;

export const Default = Template.bind({});

Default.args = {};
