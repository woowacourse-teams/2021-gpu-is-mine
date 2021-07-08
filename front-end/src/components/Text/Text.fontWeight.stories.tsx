import { ComponentStory, ComponentMeta } from "@storybook/react";
import Text from "./Text";

export default {
  title: "Components/Text/fontWeight",
  component: Text,
} as ComponentMeta<typeof Text>;

const testString = `모든 국민은 인간으로서의 존엄과 가치를 가지며, 행복을 추구할 권리를 가진다. 국가는 개인이 가지는 불가침의 기본적 인권을 확인하고 이를 보장할 의무를 진다.

군사법원의 조직·권한 및 재판관의 자격은 법률로 정한다. 대한민국의 경제질서는 개인과 기업의 경제상의 자유와 창의를 존중함을 기본으로 한다. 대법관은 대법원장의 제청으로 국회의 동의를 얻어 대통령이 임명한다.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras blandit est id turpis efficitur, non tincidunt elit tempor. Aliquam erat volutpat. Vestibulum eget neque et nulla aliquet tempor non eget orci. Etiam a tincidunt lectus. Proin vitae lorem vitae sem mollis sagittis. Maecenas in tristique diam. Quisque viverra nunc non purus pretium volutpat. Donec a sodales urna. Nam facilisis porttitor magna quis rhoncus. Suspendisse libero lacus, hendrerit ut urna non, bibendum feugiat sapien. Proin venenatis, augue consectetur dapibus auctor, sapien arcu congue metus, eu venenatis libero metus in est.
`;
const Template: ComponentStory<typeof Text> = (args) => <Text {...args}>{testString}</Text>;

export const Default = Template.bind({});

Default.args = {};

export const Thin = Template.bind({});

Thin.args = {
  weight: "thin",
};

export const Light = Template.bind({});

Light.args = {
  weight: "light",
};

export const Regular = Template.bind({});

Regular.args = {
  weight: "regular",
};

export const _Medium = Template.bind({});

_Medium.args = {
  weight: "medium",
};

_Medium.storyName = "FontWeight/Medium";

export const Bold = Template.bind({});

Bold.args = {
  weight: "bold",
};

export const Black = Template.bind({});

Black.args = {
  weight: "black",
};
