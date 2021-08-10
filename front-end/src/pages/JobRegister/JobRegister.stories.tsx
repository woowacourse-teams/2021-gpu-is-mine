import { ComponentMeta, ComponentStory } from "@storybook/react";
import { authContext } from "../../hooks/useAuth/useAuth";
import JobRegister from "./JobRegister";
import { authContextValue } from "../../__fixtures__";

export default {
  title: "Pages/JobRegister",
  component: JobRegister,
  decorators: [
    (story) => <authContext.Provider value={authContextValue}>{story()}</authContext.Provider>,
  ],
} as ComponentMeta<typeof JobRegister>;

const Template: ComponentStory<typeof JobRegister> = () => <JobRegister />;

export const Default = Template.bind({});

Default.args = {};
