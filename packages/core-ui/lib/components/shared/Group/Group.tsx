import classNames from "classnames";
import { ComponentPropsWithoutRef } from "react";

type Props = ComponentPropsWithoutRef<"div"> & {
  orientation?: "horizontal" | "vertical";
};

export default function Group({ orientation = "horizontal", ...props }: Props) {
  return (
    <div
      className={classNames(
        "flex",
        {
          "flex-row space-x-2 items-center justify-between":
            orientation == "horizontal",
          "flex-col space-y-2": orientation == "vertical",
        },
        props.className
      )}
      {...props}
    />
  );
}
