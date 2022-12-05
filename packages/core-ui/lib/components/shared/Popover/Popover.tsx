import * as PopoverPrimitive from "@radix-ui/react-popover";
import classNames from "classnames";

const Root = PopoverPrimitive.Root;
const Trigger = PopoverPrimitive.Trigger;

type ContentProps = React.ComponentPropsWithRef<
  typeof PopoverPrimitive.Content
>;

const Content = function ({ ...props }: ContentProps) {
  return (
    <PopoverPrimitive.Content
      sideOffset={3}
      {...props}
      className={classNames(
        "rounded-lg text-gray-300 bg-gray-700",
        "shadow-md",
        "min-w-[180px]",
        "p-1",
        props.className
      )}
    />
  );
};

export { Root, Trigger, Content };
