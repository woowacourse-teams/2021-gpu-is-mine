import { HTMLAttributes } from "react";
import { JobStatus } from "../../types";
import {
  StyledCalendarCheckIcon,
  StyledCalendarCancelIcon,
  StyledCalendarRunIcon,
  StyledCalendarWaitIcon,
  StyledCalendarFailedIcon,
} from "./CalendarIcon.styled";

export type Size = "sm" | "md" | "lg";

interface CalendarIconProps extends HTMLAttributes<HTMLOrSVGElement> {
  status: JobStatus;
  size?: Size;
}

const CalendarIcon = ({ size = "sm", status, ...rest }: CalendarIconProps) => {
  switch (status) {
    case "COMPLETED":
      return <StyledCalendarCheckIcon size={size} {...rest} />;
    case "CANCELED":
      return <StyledCalendarCancelIcon size={size} {...rest} />;
    case "RUNNING":
      return <StyledCalendarRunIcon size={size} {...rest} />;
    case "WAITING":
      return <StyledCalendarWaitIcon size={size} {...rest} />;
    case "FAILED":
      return <StyledCalendarFailedIcon size={size} {...rest} />;
    default:
      return null;
  }
};

export default CalendarIcon;
