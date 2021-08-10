import { ComponentMeta, ComponentStory } from "@storybook/react";
import { authContext } from "../../hooks/useAuth/useAuth";
import GpuServerRegister from "./GpuServerRegister";
import { authContextValue } from "../../__fixtures__";

export default {
  title: "Pages/GpuServerRegister",
  component: GpuServerRegister,
  decorators: [
    (story) => <authContext.Provider value={authContextValue}>{story()}</authContext.Provider>,
  ],
} as ComponentMeta<typeof GpuServerRegister>;

const Template: ComponentStory<typeof GpuServerRegister> = () => <GpuServerRegister />;

export const Default = Template.bind({});

Default.args = {};
