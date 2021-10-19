import { ComponentStory, ComponentMeta } from "@storybook/react";
import Text from "../Text/Text";

import Toast from "./Toast";

export default {
  title: "Components/Toast",
  component: Toast,
} as ComponentMeta<typeof Toast>;

const Template: ComponentStory<typeof Toast> = (args) => <Toast {...args} />;

export const InfoToast = Template.bind({});

InfoToast.args = {
  type: "info",
  open: true,
  onClose: () => {
    window.alert("onClose called");
  },
  children: <Text>GPU 내껀데는 2021년 6월 22일부터 시작하였어요</Text>,
};

export const SuccessToast = Template.bind({});

SuccessToast.args = {
  type: "success",
  open: true,
  onClose: () => {
    window.alert("onClose called");
  },
  children: <Text>회원가입에 성공하였습니다</Text>,
};

export const WarningToast = Template.bind({});

WarningToast.args = {
  type: "warning",
  open: true,
  onClose: () => {
    window.alert("onClose called");
  },
  children: <Text>회원가입에 성공하였습니다</Text>,
};

export const ErrorToast = Template.bind({});

ErrorToast.args = {
  type: "error",
  open: true,
  onClose: () => {
    window.alert("onClose called");
  },
  children: <Text>회원가입에 성공하였습니다</Text>,
};
