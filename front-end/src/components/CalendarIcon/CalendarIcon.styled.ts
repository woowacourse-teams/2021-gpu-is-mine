import styled, { css } from "styled-components";
import CalendarCancel from "./calendar-cancel.svg";
import CalendarCheck from "./calendar-check.svg";
import CalendarRun from "./calendar-run.svg";
import CalendarWait from "./calendar-wait.svg";

export type Size = "sm" | "md" | "lg";

export interface StyledCalendarIconProps {
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
  ${({ size }: StyledCalendarIconProps) => getSizeStyle(size)}
`;

export const StyledCalendarCheckIcon = styled(CalendarCheck)`
  ${({ size }: StyledCalendarIconProps) => getSizeStyle(size)}
`;

export const StyledCalendarRunIcon = styled(CalendarRun)`
  ${({ size }: StyledCalendarIconProps) => getSizeStyle(size)}
`;

export const StyledCalendarWaitIcon = styled(CalendarWait)`
  ${({ size }: StyledCalendarIconProps) => getSizeStyle(size)}
`;
