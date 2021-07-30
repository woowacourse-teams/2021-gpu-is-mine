import { ComponentStory, ComponentMeta } from "@storybook/react";
import JobInfoItemDetail from "./JobInfoItemDetail";

export default {
  title: "Domains/Job/InfoItemDetail",
  component: JobInfoItemDetail,
} as ComponentMeta<typeof JobInfoItemDetail>;

const Template: ComponentStory<typeof JobInfoItemDetail> = () => <JobInfoItemDetail />;

export const Default = Template.bind({});

Default.args = {};
