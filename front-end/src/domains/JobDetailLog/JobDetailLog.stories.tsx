import { ComponentStory, ComponentMeta } from "@storybook/react";
import { authContext } from "../../hooks/useAuth/useAuth";
import JobDetailLog from "./JobDetailLog";
import { authContextValue } from "../../__fixtures__";

export default {
  title: "Domains/Job/DetailLog",
  component: JobDetailLog,
  decorators: [
    (story) => <authContext.Provider value={authContextValue}>{story()}</authContext.Provider>,
  ],
} as ComponentMeta<typeof JobDetailLog>;

const Template: ComponentStory<typeof JobDetailLog> = (args) => <JobDetailLog {...args} />;

export const Default = Template.bind({});

Default.args = {
  labId: 1,
  jobId: 1,
};
