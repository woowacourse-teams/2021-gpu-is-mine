import { ComponentMeta, ComponentStory } from "@storybook/react";
import styled from "styled-components";
import { up } from "styled-breakpoints";
import { Header, SubHeader } from "../../domains/Common";
import { ManagerNavigation } from "../../domains/Manager";
import { GpuServerRegisterForm } from "../../features/gpuServer";
import Layout from "./Layout";

export default {
  title: "Components/Layout",
  component: Layout,
} as ComponentMeta<typeof Layout>;

const Template: ComponentStory<typeof Layout> = (args) => <Layout {...args} />;

export const Default = Template.bind({});

const StyledRegisterForm = styled(GpuServerRegisterForm)`
  background-color: white;
  padding: 1rem;
  border-radius: 1rem;

  ${up("tablet")} {
    max-width: 40rem;
    padding: 2rem;
    margin: auto;
  }
`;

Default.args = {
  Header: <Header labName="GPU_IS_MINE" />,
  SubHeader: <SubHeader />,
  Aside: <ManagerNavigation />,
  Main: <StyledRegisterForm />,
};
