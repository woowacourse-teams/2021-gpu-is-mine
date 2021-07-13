import { ComponentStory, ComponentMeta } from "@storybook/react";

import Modal from "./Modal";

export default {
  title: "Components/Modal",
  component: Modal,
} as ComponentMeta<typeof Modal>;

const Template: ComponentStory<typeof Modal> = (args) => <Modal {...args} />;

export const BaseModal = Template.bind({});

BaseModal.args = {
  isOpen: true,
  children: (
    <div style={{ width: "200px", height: "100px", backgroundColor: "beige" }}>모달 내부 내용</div>
  ),
  close: () => {
    alert("dimmed click");
  },
};
