import { ComponentStory, ComponentMeta } from "@storybook/react";
import ModalProvider from "../ModalProvider/ModalProvider";
import Modal from "./Modal";

export default {
  title: "Components/Modal",
  component: Modal,
  decorators: [
    (Story) => (
      <ModalProvider defaultIsOpen>
        <Story />
      </ModalProvider>
    ),
  ],
} as ComponentMeta<typeof Modal>;

const Template: ComponentStory<typeof Modal> = (args) => <Modal {...args} />;

export const BaseModal = Template.bind({});

BaseModal.args = {
  children: (
    <div style={{ width: "200px", height: "100px", backgroundColor: "beige" }}>모달 내부 내용</div>
  ),
};
