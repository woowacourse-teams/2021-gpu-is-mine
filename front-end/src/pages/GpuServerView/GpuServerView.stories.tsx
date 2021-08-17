import { ComponentMeta, ComponentStory } from "@storybook/react";
import { authContext } from "../../hooks/useAuth/useAuth";
import GpuServerView from "./GpuServerView";
import { authContextValue } from "../../__fixtures__";

export default {
  title: "Pages/GpuServerView",
  component: GpuServerView,
  decorators: [
    (story) => <authContext.Provider value={authContextValue}>{story()}</authContext.Provider>,
  ],
} as ComponentMeta<typeof GpuServerView>;

const Template: ComponentStory<typeof GpuServerView> = () => <GpuServerView />;

export const Default = Template.bind({});

Default.args = {};
