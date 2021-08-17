import { ComponentStory, ComponentMeta } from "@storybook/react";
import Text from "../Text/Text";
import VerticalBox from "./VerticalBox";

export default {
  title: "Components/VerticalBox",
  component: VerticalBox,
} as ComponentMeta<typeof VerticalBox>;

const Template: ComponentStory<typeof VerticalBox> = (args) => <VerticalBox {...args} />;

export const Default = Template.bind({});

Default.args = {
  children: (
    <>
      <Text>GPU연산량</Text>
      <Text size="sm" weight="light">
        1,000TFLOPS
      </Text>
    </>
  ),
};
