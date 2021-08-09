import { ComponentMeta, ComponentStory } from "@storybook/react";
import { authContext } from "../../../hooks/useAuth/useAuth";
import JobView from "./JobView";
import { authContextValue } from "../../../__fixtures__";

export default {
  title: "Pages/Manager/JobView",
  component: JobView,
  decorators: [
    (story) => <authContext.Provider value={authContextValue}>{story()}</authContext.Provider>,
  ],
} as ComponentMeta<typeof JobView>;

const Template: ComponentStory<typeof JobView> = () => <JobView />;

export const Default = Template.bind({});

Default.args = {};
