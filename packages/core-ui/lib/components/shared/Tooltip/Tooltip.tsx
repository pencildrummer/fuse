import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import classNames from "classnames";
import { useEffect, useMemo } from "react";

export type TooltipProps = {
  size?: "hint" | "sm" | null;
  showArrow?: boolean;
  content: React.ReactNode;
  delayDuration?: TooltipPrimitive.TooltipProps["delayDuration"];
} & TooltipPrimitive.TooltipContentProps;

export default function Tooltip({
  size,
  showArrow = false,
  content,
  ...props
}: TooltipProps) {
  const preferredDelayDuration = useMemo(() => {
    if (size == "hint") {
      return 750;
    } else {
      return 150;
    }
  }, [size]);

  const sizeClassNames = useMemo(() => {
    switch (size) {
      case "hint":
        return "text-xxs font-normal rounded-sm p-1 border border-gray-500";
      case "sm":
        return "text-xxs font-medium rounded-md px-1.5 py-1";
      default:
        return "text-xs rounded-md p-2";
    }
  }, [size]);

  const defaultProps: Omit<TooltipProps, "content"> = useMemo(() => {
    switch (size) {
      case "hint":
        return {
          side: "bottom",
          sideOffset: 3,
          align: "start",
          alignOffset: 15,
        };
    }
  }, [size]);

  return (
    <TooltipPrimitive.Provider>
      <TooltipPrimitive.Root
        delayDuration={props.delayDuration || preferredDelayDuration}
      >
        <TooltipPrimitive.Trigger asChild>
          {props.children}
        </TooltipPrimitive.Trigger>
        <TooltipPrimitive.TooltipPortal>
          <TooltipPrimitive.Content
            {...defaultProps}
            {...props}
            className={classNames(
              "leading-none",
              "bg-gray-700 text-gray-100 font-bold shadow-sm",
              sizeClassNames
            )}
          >
            {showArrow && <TooltipPrimitive.Arrow className="fill-gray-700" />}
            {content}
          </TooltipPrimitive.Content>
        </TooltipPrimitive.TooltipPortal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
}
