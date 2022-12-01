import * as LabelPrimitive from "@radix-ui/react-label";
import classNames from "classnames";

export default function Label({ ...props }) {
  return (
    <LabelPrimitive.Root
      className={classNames(
        "font-semibold truncate",
        "select-none cursor-default",
        "text-gray-800 dark:text-gray-300",
        props.className
      )}
      {...props}
    />
  );
}
