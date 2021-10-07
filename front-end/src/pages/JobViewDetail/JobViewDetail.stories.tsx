import { MemoryRouter, Route } from "react-router-dom";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import JobViewDetail from "./JobViewDetail";

export default {
  title: "Pages/JobViewDetail",
  component: JobViewDetail,
  decorators: [
    (story) => (
      <MemoryRouter initialEntries={["/8"]}>
        <Route path="/:jobId">{story()}</Route>
      </MemoryRouter>
    ),
  ],
} as ComponentMeta<typeof JobViewDetail>;

const Template: ComponentStory<typeof JobViewDetail> = () => <JobViewDetail />;

export const Default = Template.bind({});

Default.args = {};
