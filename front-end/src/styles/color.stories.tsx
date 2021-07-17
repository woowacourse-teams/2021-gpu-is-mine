import { ComponentMeta, ComponentStory } from "@storybook/react";
import styled, { css } from "styled-components";
import { VerticalBox, Text } from "../components";

const ColorPalette = styled.section`
  display: grid;
  row-gap: 1rem;
  column-gap: 3rem;
  grid-template-rows: repeat(10, auto);
  grid-auto-flow: column;
`;

const Block = styled.div<{ css_: ReturnType<typeof css> }>`
  width: 100%;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  padding: 0.25rem 0.5rem;

  ${({ css_ }) => css_}
`;

const ColorList = [
  {
    text: "primary-900",
    css: css`
      background-color: var(--primary-900);
      color: var(--on-primary-900);
    `,
  },
  {
    text: "primary-800",
    css: css`
      background-color: var(--primary-800);
      color: var(--on-primary-800);
    `,
  },
  {
    text: "primary-700",
    css: css`
      background-color: var(--primary-700);
      color: var(--on-primary-700);
    `,
  },
  {
    text: "primary-600",
    css: css`
      background-color: var(--primary-600);
      color: var(--on-primary-600);
    `,
  },
  {
    text: "primary-500",
    css: css`
      background-color: var(--primary-500);
      color: var(--on-primary-500);
    `,
  },
  {
    text: "primary-400",
    css: css`
      background-color: var(--primary-400);
      color: var(--on-primary-400);
    `,
  },
  {
    text: "primary-300",
    css: css`
      background-color: var(--primary-300);
      color: var(--on-primary-300);
    `,
  },
  {
    text: "primary-200",
    css: css`
      background-color: var(--primary-200);
      color: var(--on-primary-200);
    `,
  },
  {
    text: "primary-100",
    css: css`
      background-color: var(--primary-100);
      color: var(--on-primary-100);
    `,
  },
  {
    text: "primary-50",
    css: css`
      background-color: var(--primary-50);
      color: var(--on-primary-50);
    `,
  },
  {
    text: "secondary-900",
    css: css`
      background-color: var(--secondary-900);
      color: var(--on-secondary-900);
    `,
  },
  {
    text: "secondary-800",
    css: css`
      background-color: var(--secondary-800);
      color: var(--on-secondary-800);
    `,
  },
  {
    text: "secondary-700",
    css: css`
      background-color: var(--secondary-700);
      color: var(--on-secondary-700);
    `,
  },
  {
    text: "secondary-600",
    css: css`
      background-color: var(--secondary-600);
      color: var(--on-secondary-600);
    `,
  },
  {
    text: "secondary-500",
    css: css`
      background-color: var(--secondary-500);
      color: var(--on-secondary-500);
    `,
  },
  {
    text: "secondary-400",
    css: css`
      background-color: var(--secondary-400);
      color: var(--on-secondary-400);
    `,
  },
  {
    text: "secondary-300",
    css: css`
      background-color: var(--secondary-300);
      color: var(--on-secondary-300);
    `,
  },
  {
    text: "secondary-200",
    css: css`
      background-color: var(--secondary-200);
      color: var(--on-secondary-200);
    `,
  },
  {
    text: "secondary-100",
    css: css`
      background-color: var(--secondary-100);
      color: var(--on-secondary-100);
    `,
  },
  {
    text: "secondary-50",
    css: css`
      background-color: var(--secondary-50);
      color: var(--on-secondary-50);
    `,
  },
  {
    text: "surface",
    css: css`
      background-color: var(--surface);
      color: var(--on-surface);
    `,
  },
  {
    text: "background",
    css: css`
      background-color: var(--background);
      color: var(--on-background);
    `,
  },
  {
    text: "error",
    css: css`
      background-color: var(--error);
      color: var(--on-error);
    `,
  },
  {
    text: "disabled",
    css: css`
      background-color: var(--disabled);
      color: var(--on-disabled);
    `,
  },
];

export default {
  title: "Styles/Color",
  component: ColorPalette,
} as ComponentMeta<typeof ColorPalette>;

const Template: ComponentStory<typeof ColorPalette> = () => (
  <ColorPalette>
    {ColorList.map(({ text, css: css_ }) => (
      <VerticalBox>
        <Text size="sm" weight="bold">
          {text}
        </Text>
        <Block css_={css_}>
          <Text size="sm" weight="medium">
            GPU 내껀데
          </Text>
        </Block>
      </VerticalBox>
    ))}
  </ColorPalette>
);

export const Default = Template.bind({});

Default.args = {};
