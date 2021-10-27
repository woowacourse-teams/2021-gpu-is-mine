import { ComponentStory, ComponentMeta } from "@storybook/react";
import { GpuServerInfoItem } from "../../features/gpuServer";
import { simpleGpuServer } from "../../__fixtures__";
import Text from "../Text/Text";
import Radio from "./Radio";

export default {
  title: "Components/Radio",
  component: Radio,
} as ComponentMeta<typeof Radio>;

const Template: ComponentStory<typeof Radio> = (args) => <Radio {...args} />;

export const Default = Template.bind({});

Default.args = {
  children: "일반 텍스트",
};

export const MediumTextRadio = Template.bind({});

MediumTextRadio.args = {
  children: <Text size="md">중간 텍스트</Text>,
};

export const LargeTextRadio = Template.bind({});

LargeTextRadio.args = {
  children: <Text size="lg">큰 텍스트</Text>,
};

export const ServerInfoItemRadio = Template.bind({});

ServerInfoItemRadio.args = {
  children: <GpuServerInfoItem serverId={simpleGpuServer.id} />,
};

export const DisabledRadio = Template.bind({});

DisabledRadio.args = {
  disabled: true,
  children: <Text size="md">Disabled</Text>,
};
