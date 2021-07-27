import { ComponentStory, ComponentMeta } from "@storybook/react";

import CalendarIcon from "./CalendarIcon";

export default {
  title: "Components/CalendarIcon",
  component: CalendarIcon,
} as ComponentMeta<typeof CalendarIcon>;

const Template: ComponentStory<typeof CalendarIcon> = (args) => <CalendarIcon {...args} />;

export const Completed = Template.bind({});

Completed.args = {
  status: "COMPLETED",
};

export const Canceled = Template.bind({});

Canceled.args = {
  status: "CANCELED",
};

export const Running = Template.bind({});

Running.args = {
  status: "RUNNING",
};

export const Waiting = Template.bind({});

Waiting.args = {
  status: "WAITING",
};
