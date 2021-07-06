import { ComponentStory, ComponentMeta } from "@storybook/react";

import App from "./App";

export default {
  title: "Test/App",
  component: App,
} as ComponentMeta<typeof App>;

const Template: ComponentStory<typeof App> = (args) => <App {...args} />;

export const Primary = Template.bind({});

Primary.args = {};
