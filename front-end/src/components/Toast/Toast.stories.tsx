import { ComponentStory, ComponentMeta } from "@storybook/react";

import Toast from "./Toast";

export default {
  title: "Components/Toast",
  component: Toast,
} as ComponentMeta<typeof Toast>;

const Template: ComponentStory<typeof Toast> = (args) => <Toast {...args} />;

export const InfoToast = Template.bind({});

InfoToast.args = {
  type: "info",
  title: "TMI",
  message: "GPU 내껀데는 2021년 6월 22일부터 시작하였어요",
};

export const SuccessToast = Template.bind({});

SuccessToast.args = {
  type: "success",
  title: "회원가입에 성공하였습니다",
  message: "반가워요 동동님",
};

export const WarningToast = Template.bind({});

WarningToast.args = {
  type: "warning",
  title: "자동 로그아웃 안내",
  message: "10분 후 로그아웃됩니다",
};

export const ErrorToast = Template.bind({});

ErrorToast.args = {
  type: "error",
  title: "Email Validation",
  message: "중복된 이메일입니다",
};
