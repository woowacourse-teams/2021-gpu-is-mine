import { ComponentMeta, ComponentStory } from "@storybook/react";
import { authContext } from "../../hooks/useAuth/useAuth";
import GpuServerViewDetail from "./GpuServerViewDetail";
import { authContextValue } from "../../__fixtures__";

export default {
  title: "Pages/GpuServerViewDetail",
  component: GpuServerViewDetail,
  decorators: [
    (story) => <authContext.Provider value={authContextValue}>{story()}</authContext.Provider>,
  ],
} as ComponentMeta<typeof GpuServerViewDetail>;

const Template: ComponentStory<typeof GpuServerViewDetail> = () => <GpuServerViewDetail />;

export const Default = Template.bind({});

Default.args = {};
