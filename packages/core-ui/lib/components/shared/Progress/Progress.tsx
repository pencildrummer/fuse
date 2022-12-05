import * as ProgressPrimitive from "@radix-ui/react-progress";
import classNames from "classnames";
import { useMemo } from "react";

export default function Progress(props) {
  const value = Math.max(0, props.value);
  const max = Math.max(0, props.max);

  const progress = useMemo(() => {
    return (value / max) * 100;
  }, [value, max]);

  return (
    <ProgressPrimitive.Root
      {...props}
      value={value}
      max={max}
      className={classNames(
        "relative",
        "h-[2px]",
        "w-full",
        "bg-gray-800",
        props.className
      )}
    >
      <ProgressPrimitive.Indicator
        className="h-full transition-[width] duration-150 bg-blue-600"
        style={{ width: `${progress}%` }}
      />
    </ProgressPrimitive.Root>
  );
}
