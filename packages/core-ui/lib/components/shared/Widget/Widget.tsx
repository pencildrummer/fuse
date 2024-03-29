import classNames from "classnames";
import React from "react";

function WidgetTitle({ ...props }) {
  return (
    <div
      className={classNames(
        "flex flex-row items-center",
        "dark:text-gray-500",
        "border-b dark:border-gray-800",
        "text-xxs uppercase",
        "font-syncopate leading-none",
        "pb-1.5"
      )}
    >
      {props.children}
    </div>
  );
}

function WidgetVersion({ ...props }) {
  return (
    <div className="relative !mt-auto pt-2 h-0 flex items-center justify-end">
      <span className="font-mono text-xxs opacity-30 leading-none">
        v. {props.children}
      </span>
    </div>
  );
}

type Props = React.PropsWithChildren<{
  title?: React.ReactNode;
  version?: string;
  full?: boolean;
  className?: string;
}>;
let asd: Props["title"];

const Widget = React.forwardRef<HTMLDivElement, Props>(
  ({ title, version, full = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        {...props}
        className={classNames(
          "relative",
          "flex flex-col items-stretch justify-start",
          {
            "p-3": !full,
          },
          "space-y-3",
          "rounded-md",
          "overflow-hidden",
          "text-sm",
          "text-gray-900 dark:text-gray-200",
          "bg-gray-300 dark:bg-gray-900",
          props.className
        )}
      >
        {title && <WidgetTitle>{title}</WidgetTitle>}
        {props.children}
        {version && <WidgetVersion>{version}</WidgetVersion>}
      </div>
    );
  }
);
Widget.displayName = "Widget";
export default Widget;
