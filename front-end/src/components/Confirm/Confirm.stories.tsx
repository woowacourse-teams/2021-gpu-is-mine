import { ComponentStory, ComponentMeta } from "@storybook/react";
import Confirm from "./Confirm";
import Text from "../Text/Text";

export default {
  title: "Components/Confirm",
  component: Confirm,
} as ComponentMeta<typeof Confirm>;

const Template: ComponentStory<typeof Confirm> = (args) => <Confirm {...args} />;

export const DefaultConfirm = Template.bind({});

DefaultConfirm.args = {
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

export const ShortContentConfirm = Template.bind({});

ShortContentConfirm.args = {
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

export const LongContentConfirm = Template.bind({});

LongContentConfirm.args = {
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
