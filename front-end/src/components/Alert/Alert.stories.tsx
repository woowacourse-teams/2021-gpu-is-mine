import { ComponentStory, ComponentMeta } from "@storybook/react";

import Alert from "./Alert";
import Text from "../Text/Text";
import AlertProvider from "../AlertProvider/AlertProvider";

export default {
  title: "Components/Alert",
  component: Alert,
  decorators: [
    (Story) => (
      <AlertProvider defaultIsOpen={true}>
        <Story />
      </AlertProvider>
    ),
  ],
} as ComponentMeta<typeof Alert>;

const Template: ComponentStory<typeof Alert> = (args) => <Alert {...args} />;

export const DefaultAlert = Template.bind({});

DefaultAlert.args = {
  children: (
    <Text size="md" weight="bold">
      작업이 완료되었습니다.
    </Text>
  ),
  onConfirm: () => {
    alert("확인");
  },
};

export const ShortContentAlert = Template.bind({});

ShortContentAlert.args = {
  children: (
    <Text size="md" weight="bold">
      X
    </Text>
  ),
  onConfirm: () => {
    alert("확인");
  },
};

export const LongContentAlert = Template.bind({});

LongContentAlert.args = {
  children: (
    <Text size="md" weight="bold">
      완료되었습니다.완료되었습니다완료되었습니다완료되었습니다완료되었습니다완료되었습니다완료되었습니다완료되었습니다완료되었습니다완료되었습니다완료되었습니다완료되었습니다완료되었습니다완료되었습니다완료되었습니다완료되었습니다
    </Text>
  ),
  onConfirm: () => {
    alert("확인");
  },
};
