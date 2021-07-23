import { ComponentStory, ComponentMeta } from "@storybook/react";
import { gpuServersResponses } from "../../fixtures";
import RadioGroup from "./RadioGroup";

export default {
  title: "Components/RadioGroup",
  component: RadioGroup,
} as ComponentMeta<typeof RadioGroup>;

const Template: ComponentStory<typeof RadioGroup> = (args) => <RadioGroup {...args} />;

const defaultOptions = [
  { value: 1, contents: "radio 1" },
  { value: 2, contents: "radio 2" },
  { value: 3, contents: "radio 3" },
  { value: 4, contents: "radio 4" },
  { value: 5, contents: "radio 5" },
];

export const Default = Template.bind({});

Default.args = {
  label: "LABEL",
  value: defaultOptions[0].value,
  options: defaultOptions,
};

const gpuServerOptions = gpuServersResponses.gpuServers
  .filter(({ isOn }) => isOn)
  .map(({ id, serverName, gpuBoard: { performance }, jobs }) => ({
    value: id,
    contents: <>{`${serverName} | ${performance} | ${jobs.length}`}</>,
  }));

export const GpuServerRadioGroup = Template.bind({});

GpuServerRadioGroup.args = {
  label: "서버선택",
  value: gpuServersResponses.gpuServers[0].id,
  options: gpuServerOptions,
};
