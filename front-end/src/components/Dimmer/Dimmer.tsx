import { HTMLAttributes, MouseEventHandler, useEffect } from "react";
import { useBoolean } from "../../hooks";
import { StyledDimmer, Inner } from "./Dimmer.styled";

export type DimmerColor = "transparent" | "light" | "dark";

interface DimmerProps extends HTMLAttributes<HTMLDivElement> {
  color?: DimmerColor;
  onClose?: () => void;
  backdrop?: "static";
}

const Dimmer = ({ color = "light", onClose, backdrop, children, ...rest }: DimmerProps) => {
  const [scaleOut, addScaleOut, removeScaleOut] = useBoolean(false);

  const handleClick: MouseEventHandler<HTMLDivElement> = (event) => {
    if (onClose == null) return;
    if (event.target !== event.currentTarget) return;

    if (backdrop === "static") {
      addScaleOut();
      return;
    }

    onClose();
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (onClose == null) return;
      if (event.key !== "Escape") return;

      if (backdrop === "static") {
        addScaleOut();
        return;
      }

      onClose();
    };

    document.documentElement.addEventListener("keydown", handleKeyDown);

    return () => {
      document.documentElement.removeEventListener("keydown", handleKeyDown);
    };
  }, [backdrop, onClose, addScaleOut]);

  return (
    <StyledDimmer color={color} {...rest} onClick={handleClick}>
      <Inner onAnimationEnd={removeScaleOut} scaleOut={scaleOut}>
        {children}
      </Inner>
    </StyledDimmer>
  );
};

export default Dimmer;
