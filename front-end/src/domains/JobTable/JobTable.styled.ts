import styled, { css } from "styled-components";
import { Text } from "../../components";
import { TextProps } from "../../components/Text/Text";
import { JobStatus } from "../../types";

interface StatusTextProps extends TextProps {
  status: JobStatus;
}

const getStatusStyle = (status: JobStatus) => {
  const style = {
    WAITING: css`
      color: var(--secondary-700);
    `,
    COMPLETED: css`
      color: var(--primary-900);
    `,
    CANCELED: css`
      color: var(--error);
    `,
    RUNNING: css`
      color: var(--active);
    `,
  };

  return style[status];
};

export const StatusText = styled(Text)<StatusTextProps>`
  ${({ status }) => getStatusStyle(status)}
`;
