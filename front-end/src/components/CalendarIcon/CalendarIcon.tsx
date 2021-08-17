import { HTMLAttributes } from "react";
import { JobStatus } from "../../types";
import {
  StyledCalendarCheckIcon,
  StyledCalendarCancelIcon,
  StyledCalendarRunIcon,
  StyledCalendarWaitIcon,
  StyledCalendarIconProps,
} from "./CalendarIcon.styled";

type CalendarIconProps = Partial<StyledCalendarIconProps> &
  HTMLAttributes<HTMLOrSVGElement> & {
    status: JobStatus;
  };

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
    default:
      return null;
  }
};

export default CalendarIcon;
