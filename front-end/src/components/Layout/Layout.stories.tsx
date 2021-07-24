import { ComponentMeta, ComponentStory } from "@storybook/react";
import styled from "styled-components";
import { up } from "styled-breakpoints";
import { GpuServerRegisterForm } from "../../domains/GpuServer";
import { ManagerHeader, ManagerNavigation, ManagerSubHeader } from "../../domains/Manager";
import Layout from "./Layout";

export default {
  title: "Components/Layout",
  component: Layout,
} as ComponentMeta<typeof Layout>;

const Template: ComponentStory<typeof Layout> = (args) => <Layout {...args} />;

export const Default = Template.bind({});

const labName = "GPU내꼬야Lab";

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
  Header: <ManagerHeader labName={labName} />,
  SubHeader: <ManagerSubHeader labName={labName} /* onClick={handleClick} */ />,
  Navigation: <ManagerNavigation />,
  Content: <StyledRegisterForm />,
};
