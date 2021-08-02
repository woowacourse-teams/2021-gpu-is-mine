import { ComponentMeta, ComponentStory } from "@storybook/react";
import { MemoryRouter, Route } from "react-router-dom";
import JobViewDetail from "./JobViewDetail";
import { authContext } from "../../../hooks/useAuth/useAuth";
import { authContextValue } from "../../../__fixtures__";

export default {
  title: "Pages/Manager/JobViewDetail",
  component: JobViewDetail,
  decorators: [
    (story) => (
      <authContext.Provider value={authContextValue}>
        <MemoryRouter initialEntries={["/8"]}>
          <Route path="/:jobId">{story()}</Route>
        </MemoryRouter>
      </authContext.Provider>
    ),
  ],
} as ComponentMeta<typeof JobViewDetail>;

const Template: ComponentStory<typeof JobViewDetail> = () => <JobViewDetail />;

export const Default = Template.bind({});

Default.args = {};
