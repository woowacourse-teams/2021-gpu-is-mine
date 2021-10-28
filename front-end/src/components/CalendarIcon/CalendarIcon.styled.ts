import styled, { css } from "styled-components";
import CalendarCancel from "./calendar-cancel.svg";
import CalendarCheck from "./calendar-check.svg";
import CalendarRun from "./calendar-run.svg";
import CalendarWait from "./calendar-wait.svg";
import CalendarFailed from "./calendar-failed.svg";
import type { Size } from "./CalendarIcon";

interface StyledCalendarIconProps {
  size: Size;
}

const getSizeStyle = (size: Size) => {
  const style = {
    sm: css`
      width: 1rem;
      height: 1rem;
    `,
    md: css`
      width: 2rem;
      height: 2rem;
    `,
    lg: css`
      width: 3rem;
      height: 3rem;
    `,
  };

  return style[size];
};

export const StyledCalendarCancelIcon = styled(CalendarCancel)`
  ${({ size }: StyledCalendarIconProps) => getSizeStyle(size)};
  fill: var(--error);
`;

export const StyledCalendarCheckIcon = styled(CalendarCheck)`
  ${({ size }: StyledCalendarIconProps) => getSizeStyle(size)};
  fill: var(--active);
`;

export const StyledCalendarRunIcon = styled(CalendarRun)`
  ${({ size }: StyledCalendarIconProps) => getSizeStyle(size)};
  fill: var(--running);
`;

export const StyledCalendarWaitIcon = styled(CalendarWait)`
  ${({ size }: StyledCalendarIconProps) => getSizeStyle(size)};
  fill: var(--secondary-700);
`;

export const StyledCalendarFailedIcon = styled(CalendarFailed)`
  ${({ size }: StyledCalendarIconProps) => getSizeStyle(size)};
  fill: var(--failed);
`;
