import { ComponentStory, ComponentMeta } from "@storybook/react";
import Dialog from "./Dialog";
import Text from "../Text/Text";

export default {
  title: "Components/Dialog",
  component: Dialog,
} as ComponentMeta<typeof Dialog>;

const Template: ComponentStory<typeof Dialog> = (args) => <Dialog {...args} />;

export const DefaultDialog = Template.bind({});

DefaultDialog.args = {
  children: (
    <Text size="md" weight="bold">
      정말로 삭제하시겠습니까?
    </Text>
  ),
  onCancel: () => {
    alert("취소");
  },
  onConfirm: () => {
    alert("확인");
  },
};

export const ShortContentDialog = Template.bind({});

ShortContentDialog.args = {
  children: (
    <Text size="md" weight="bold">
      X
    </Text>
  ),
  onCancel: () => {
    alert("취소");
  },
  onConfirm: () => {
    alert("확인");
  },
};

export const LongContentDialog = Template.bind({});

LongContentDialog.args = {
  children: (
    <Text size="md" weight="bold">
      정말로 삭제하시겠습니까?정말로 삭제하시겠습니까?정말로 삭제하시겠습니까?정말로
      삭제하시겠습니까?정말로 삭제하시겠습니까?정말로 삭제하시겠습니까?정말로
      삭제하시겠습니까?정말로 삭제하시겠습니까?정말로 삭제하시겠습니까?정말로
      삭제하시겠습니까?정말로 삭제하시겠습니까?정말로 삭제하시겠습니까?정말로 삭제하시겠습니까?
    </Text>
  ),
  onCancel: () => {
    alert("취소");
  },
  onConfirm: () => {
    alert("확인");
  },
};
