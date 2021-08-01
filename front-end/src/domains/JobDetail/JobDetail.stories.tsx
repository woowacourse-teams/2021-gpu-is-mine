import { ComponentStory, ComponentMeta } from "@storybook/react";
import { MemoryRouter, Route } from "react-router-dom";
import JobDetail from "./JobDetail";

export default {
  title: "Domains/Job/Detail",
  component: JobDetail,
  decorators: [
    (story) => (
      <MemoryRouter initialEntries={["/8"]}>
        <Route path="/:jobId">{story()}</Route>
      </MemoryRouter>
    ),
  ],
} as ComponentMeta<typeof JobDetail>;

const Template: ComponentStory<typeof JobDetail> = (args) => <JobDetail {...args} />;

export const Default = Template.bind({});

Default.args = {
  labId: 1,
};
