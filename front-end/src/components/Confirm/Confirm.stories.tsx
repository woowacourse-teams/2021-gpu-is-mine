import { ComponentStory, ComponentMeta } from "@storybook/react";

import Confirm from "./Confirm";

export default {
  title: "Components/Confirm",
  component: Confirm,
} as ComponentMeta<typeof Confirm>;

const Template: ComponentStory<typeof Confirm> = (args) => <Confirm {...args} />;

export const BaseConfirm = Template.bind({});

BaseConfirm.args = {
  isOpen: true,
  text: "정말로 삭제하시겠습니까 ?",
  onCancel: () => {
    alert("취소");
  },
  onConfirm: () => {
    alert("확인");
  },
};
